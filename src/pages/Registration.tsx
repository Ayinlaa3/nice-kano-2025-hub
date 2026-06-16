import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CalendarDays,
  MapPin,
  CheckCircle2,
  Info,
  Landmark,
  CreditCard,
  Building2,
  UploadCloud,
  Loader2,
} from "lucide-react";
import {
  CONFERENCE,
  REGISTRATION_CATEGORIES,
  RegistrationCategoryId,
  getCategoryFee,
  formatNaira,
  isEarlyBird,
  EARLY_BIRD_CUTOFF_ISO,
  PAYMENT_INFO,
} from "@/config/conference";

const categoryIds = REGISTRATION_CATEGORIES.map((c) => c.id) as [
  RegistrationCategoryId,
  ...RegistrationCategoryId[]
];

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email address").max(160),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(30),
  address: z.string().trim().min(3, "Please enter your address").max(250),
  institution: z.string().trim().min(2, "Please enter your institution").max(160),
  position: z.string().trim().max(120).optional().or(z.literal("")),
  chapter: z.string().trim().max(120).optional().or(z.literal("")),
  membershipStatus: z.string().min(1, "Select your membership status"),
  category: z.enum(categoryIds, {
    errorMap: () => ({ message: "Select a registration category" }),
  }),
  paymentMethod: z.enum(["nice_portal_receipt", "bank_transfer_receipt", "remita"], {
    errorMap: () => ({ message: "Select a payment method" }),
  }),
  dietary: z.string().trim().max(300).optional().or(z.literal("")),
  comments: z.string().trim().max(500).optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms to register" }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

const MEMBERSHIP_OPTIONS = [
  "Fellow (FNICE)",
  "Member (MNICE)",
  "Associate Member",
  "Graduate Member",
  "Student Member",
  "Non-Member",
];

interface BankAccount {
  bank: string;
  accountName: string;
  accountNumber: string;
}

interface Confirmation {
  reference: string;
  fullName: string;
  email: string;
  category: string;
  amount: number;
  paymentMethod: FormValues["paymentMethod"];
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.includes(",") ? result.split(",")[1] : result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Registration() {
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptError, setReceiptError] = useState<string | null>(null);
  const [banks, setBanks] = useState<BankAccount[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      institution: "",
      position: "",
      chapter: "",
      membershipStatus: "",
      paymentMethod: "nice_portal_receipt",
      dietary: "",
      comments: "",
    },
  });

  const selectedCategory = watch("category");
  const selectedPayment = watch("paymentMethod");
  const earlyBird = isEarlyBird();
  const isReceiptMethod =
    selectedPayment === "nice_portal_receipt" || selectedPayment === "bank_transfer_receipt";

  const fee = useMemo(
    () => getCategoryFee(selectedCategory ?? ""),
    [selectedCategory]
  );

  useEffect(() => {
    supabase.functions
      .invoke("conference-bank-details")
      .then(({ data }) => {
        if (data?.banks) setBanks(data.banks as BankAccount[]);
      })
      .catch(() => {});
  }, []);

  const onReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setReceiptError(null);
    if (file && file.size > 8 * 1024 * 1024) {
      setReceiptError("File is too large (max 8MB).");
      setReceiptFile(null);
      return;
    }
    setReceiptFile(file);
  };

  const onSubmit = async (values: FormValues) => {
    const feeInfo = getCategoryFee(values.category);
    if (!feeInfo) {
      toast({ title: "Please select a valid category", variant: "destructive" });
      return;
    }

    const payload = {
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      address: values.address,
      institution: values.institution,
      position: values.position || null,
      chapter: values.chapter || null,
      membershipStatus: values.membershipStatus,
      dietary: values.dietary || null,
      comments: values.comments || null,
      category: values.category,
      amount: feeInfo.amount,
      earlyBird: feeInfo.isEarly,
    };

    setSubmitting(true);
    try {
      if (isReceiptMethod) {
        if (!receiptFile) {
          setReceiptError("Please upload your payment receipt.");
          setSubmitting(false);
          return;
        }
        const base64 = await fileToBase64(receiptFile);
        const { data, error } = await supabase.functions.invoke("submit-registration", {
          body: {
            ...payload,
            paymentMethod: values.paymentMethod,
            receipt: {
              filename: receiptFile.name,
              contentType: receiptFile.type || "application/octet-stream",
              data: base64,
            },
          },
        });
        if (error || !data?.success) {
          throw new Error(data?.error || error?.message || "Submission failed");
        }
        setConfirmation({
          reference: data.reference,
          fullName: values.fullName,
          email: values.email,
          category: values.category,
          amount: feeInfo.amount,
          paymentMethod: values.paymentMethod,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        // Remita
        const { data, error } = await supabase.functions.invoke("remita-initiate", {
          body: { ...payload, origin: window.location.origin },
        });
        if (error || !data?.success) {
          throw new Error(data?.error || error?.message || "Could not start Remita payment");
        }
        // Auto-submit a form to the Remita gateway
        const form = document.createElement("form");
        form.method = "POST";
        form.action = data.gatewayUrl;
        Object.entries(data.fields as Record<string, string>).forEach(([k, v]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = k;
          input.value = v;
          form.appendChild(input);
        });
        document.body.appendChild(form);
        form.submit();
      }
    } catch (err) {
      toast({
        title: "Registration failed",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
      setSubmitting(false);
    }
  };

  if (confirmation) {
    const categoryLabel = REGISTRATION_CATEGORIES.find(
      (c) => c.id === confirmation.category
    )?.label;
    return (
      <div className="container mx-auto py-12 md:py-16 max-w-3xl">
        <Helmet title={`Registration Received | NICE ${CONFERENCE.shortName}`} />
        <Card className="border-t-4 border-t-brand-primary">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-brand-primary" />
            </div>
            <CardTitle className="text-2xl">Registration Submitted</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>We've received your registration</AlertTitle>
              <AlertDescription>
                Your payment receipt has been submitted for verification. Our team
                will review it and confirm your registration by email. Please keep
                your reference number for any enquiries.
              </AlertDescription>
            </Alert>

            <div className="rounded-lg bg-brand-primary/5 ring-1 ring-brand-primary/20 p-5 text-center">
              <p className="text-sm text-muted-foreground">Your reference number</p>
              <p className="text-2xl font-bold tracking-widest text-brand-primary">
                {confirmation.reference}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <Detail label="Full Name" value={confirmation.fullName} />
              <Detail label="Email" value={confirmation.email} />
              <Detail label="Category" value={categoryLabel ?? confirmation.category} />
              <Detail label="Amount" value={formatNaira(confirmation.amount)} />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setConfirmation(null);
                  setReceiptFile(null);
                }}
                variant="professional"
              >
                Register Another Delegate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 md:py-16">
      <Helmet title={`Register | NICE ${CONFERENCE.shortName} Conference ${CONFERENCE.year}`}>
        <meta
          name="description"
          content={`Register for the NICE ${CONFERENCE.edition} & AGM, ${CONFERENCE.dates.displayLong}, ${CONFERENCE.venue.name}. Choose your category and pay by receipt upload or Remita.`}
        />
        <link
          rel="canonical"
          href={typeof window !== "undefined" ? window.location.href : "/registration"}
        />
      </Helmet>

      <header className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold">Conference Registration</h1>
        <p className="text-muted-foreground mt-2">
          Secure your place at the NICE {CONFERENCE.edition} & AGM. Physical
          attendance only.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 text-brand-primary px-3 py-1.5">
            <CalendarDays className="h-4 w-4" /> {CONFERENCE.dates.display}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-red/10 text-brand-red px-3 py-1.5">
            <MapPin className="h-4 w-4" /> {CONFERENCE.venue.name}
          </span>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-2 space-y-6"
          noValidate
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Details</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" error={errors.fullName?.message} required>
                <Input {...register("fullName")} placeholder="e.g. Engr. Jane Doe" />
              </Field>
              <Field label="Email" error={errors.email?.message} required>
                <Input type="email" {...register("email")} placeholder="you@example.com" />
              </Field>
              <Field label="Phone" error={errors.phone?.message} required>
                <Input {...register("phone")} placeholder="080..." />
              </Field>
              <Field label="Institution / Organization" error={errors.institution?.message} required>
                <Input {...register("institution")} placeholder="Company / University" />
              </Field>
              <Field label="Position / Title" error={errors.position?.message}>
                <Input {...register("position")} placeholder="e.g. Project Engineer" />
              </Field>
              <Field label="NICE Chapter / Location" error={errors.chapter?.message}>
                <Input {...register("chapter")} placeholder="e.g. Lagos Chapter" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Address" error={errors.address?.message} required>
                  <Input {...register("address")} placeholder="Your address" />
                </Field>
              </div>
              <Field label="Membership Status" error={errors.membershipStatus?.message} required>
                <Select
                  onValueChange={(v) =>
                    setValue("membershipStatus", v, { shouldValidate: true })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {MEMBERSHIP_OPTIONS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Registration Category" error={errors.category?.message} required>
                <Select
                  onValueChange={(v) =>
                    setValue("category", v as RegistrationCategoryId, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGISTRATION_CATEGORIES.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Method</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={selectedPayment}
                onValueChange={(v) =>
                  setValue("paymentMethod", v as FormValues["paymentMethod"], {
                    shouldValidate: true,
                  })
                }
                className="grid gap-3"
              >
                <PaymentOption
                  id="pay-portal"
                  value="nice_portal_receipt"
                  icon={<Building2 className="h-4 w-4" />}
                  title="NICE Portal Receipt"
                  desc="Already paid via the NICE member portal — upload your receipt."
                />
                <PaymentOption
                  id="pay-bank"
                  value="bank_transfer_receipt"
                  icon={<Landmark className="h-4 w-4" />}
                  title="Bank Transfer Receipt"
                  desc="Transfer to the NICE conference account — upload your receipt."
                />
                <PaymentOption
                  id="pay-remita"
                  value="remita"
                  icon={<CreditCard className="h-4 w-4" />}
                  title="Pay with Remita"
                  desc="Pay online now via card, bank or USSD (instant confirmation)."
                />
              </RadioGroup>

              {selectedPayment === "nice_portal_receipt" && (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    {PAYMENT_INFO.nicePortalReceipt.instructions}
                  </AlertDescription>
                </Alert>
              )}

              {selectedPayment === "bank_transfer_receipt" && (
                <div className="space-y-3">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      {PAYMENT_INFO.bankTransferReceipt.instructions}
                    </AlertDescription>
                  </Alert>
                  {banks.length > 0 && (
                    <div className="rounded-lg border divide-y">
                      {banks.map((b) => (
                        <div
                          key={b.bank}
                          className="p-3 flex items-center justify-between text-sm"
                        >
                          <div>
                            <p className="font-medium">{b.bank}</p>
                            <p className="text-xs text-muted-foreground">{b.accountName}</p>
                          </div>
                          <p className="font-mono font-semibold">{b.accountNumber}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {selectedPayment === "remita" && (
                <Alert>
                  <CreditCard className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    {PAYMENT_INFO.remita.instructions}
                  </AlertDescription>
                </Alert>
              )}

              {isReceiptMethod && (
                <div className="space-y-2">
                  <Label className="text-sm">
                    Upload Payment Receipt <span className="text-destructive">*</span>
                  </Label>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
                    }}
                    className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <UploadCloud className="h-6 w-6 text-brand-primary" />
                    <p className="text-sm text-muted-foreground text-center">
                      {receiptFile ? (
                        <span className="font-medium text-foreground">{receiptFile.name}</span>
                      ) : (
                        <>Click to upload (PDF, JPG or PNG — max 8MB)</>
                      )}
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf,image/png,image/jpeg"
                    className="hidden"
                    onChange={onReceiptChange}
                  />
                  {receiptError && (
                    <p className="text-xs text-destructive">{receiptError}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Dietary / Special Requirements" error={errors.dietary?.message}>
                <Textarea
                  {...register("dietary")}
                  placeholder="Let us know about any accessibility or dietary needs"
                  rows={2}
                />
              </Field>
              <Field label="Comments / Questions" error={errors.comments?.message}>
                <Textarea
                  {...register("comments")}
                  placeholder="Anything else you'd like us to know?"
                  rows={3}
                />
              </Field>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  onCheckedChange={(v) =>
                    setValue("consent", (v === true) as true, { shouldValidate: true })
                  }
                />
                <Label htmlFor="consent" className="text-sm font-normal leading-snug">
                  I confirm the information provided is accurate and I consent to
                  NICE contacting me regarding my conference registration.
                </Label>
              </div>
              {errors.consent && (
                <p className="text-sm text-destructive">{errors.consent.message}</p>
              )}

              <Button
                type="submit"
                variant="professional"
                size="lg"
                className="w-full"
                disabled={submitting}
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                {selectedPayment === "remita" ? "Proceed to Remita Payment" : "Submit Registration"}
              </Button>
            </CardContent>
          </Card>
        </form>

        {/* Fee summary sidebar */}
        <aside className="lg:sticky lg:top-24 space-y-4">
          <Card className="border-t-4 border-t-brand-primary">
            <CardHeader>
              <CardTitle className="text-lg">Your Fee</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {fee ? (
                <>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {fee.category?.label}
                      </p>
                      <p className="text-3xl font-bold text-brand-primary">
                        {formatNaira(fee.amount)}
                      </p>
                    </div>
                    {fee.isEarly ? (
                      <Badge className="bg-brand-yellow text-brand-gold-foreground">
                        Early Bird
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Regular</Badge>
                    )}
                  </div>
                  {fee.category?.note && (
                    <p className="text-xs text-muted-foreground">
                      {fee.category.note}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select a registration category to see your fee.
                </p>
              )}

              <div className="rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
                {earlyBird ? (
                  <>
                    <span className="font-medium text-foreground">Early-bird pricing is active</span>{" "}
                    until {new Date(EARLY_BIRD_CUTOFF_ISO).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}.
                  </>
                ) : (
                  <>Early-bird pricing has ended. Regular rates now apply.</>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">All Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {REGISTRATION_CATEGORIES.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0"
                >
                  <span className="text-muted-foreground">{c.label}</span>
                  <span className="font-medium">
                    {formatNaira(earlyBird ? c.earlyBird : c.regular)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function PaymentOption({
  id,
  value,
  icon,
  title,
  desc,
}: {
  id: string;
  value: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <label
      htmlFor={id}
      className="flex items-start gap-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 [&:has([data-state=checked])]:border-brand-primary [&:has([data-state=checked])]:bg-brand-primary/5"
    >
      <RadioGroupItem value={value} id={id} className="mt-1" />
      <span>
        <span className="font-medium flex items-center gap-2">
          {icon} {title}
        </span>
        <span className="block text-xs text-muted-foreground mt-1">{desc}</span>
      </span>
    </label>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
