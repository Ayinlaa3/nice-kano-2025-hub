import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { payWithRemita } from "@/lib/remitaWidget";
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
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  position: z.string().trim().max(120).optional().or(z.literal("")),
  chapter: z.string().trim().max(120).optional().or(z.literal("")),
  membershipStatus: z.string().min(1, "Select your membership status"),
  category: z.enum(categoryIds, {
    errorMap: () => ({ message: "Select a registration category" }),
  }),
  paymentMethod: z.literal("remita"),
  daysAttending: z.array(z.enum(["1", "2", "3"]))
    .min(1, "Select at least one day you plan to attend"),
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
      organization: "",
      position: "",
      chapter: "",
      membershipStatus: "",
      paymentMethod: "remita",
      daysAttending: ["1", "2", "3"],
      dietary: "",
      comments: "",
    },
  });

  const selectedCategory = watch("category");
  const selectedPayment = watch("paymentMethod");
  const selectedDays = watch("daysAttending") ?? [];
  const earlyBird = isEarlyBird();
  const isReceiptMethod = false;

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
      organization: values.organization || values.institution,
      position: values.position || null,
      chapter: values.chapter || null,
      membershipStatus: values.membershipStatus,
      dietary: values.dietary || null,
      comments: values.comments || null,
      category: values.category,
      amount: feeInfo.amount,
      earlyBird: feeInfo.isEarly,
      daysAttending: values.daysAttending,
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
        // Remita — open the inline widget with a pre-generated RRR
        const { data, error } = await supabase.functions.invoke("remita-initiate", {
          body: { ...payload, origin: window.location.origin },
        });
        if (error || !data?.success) {
          throw new Error(data?.error || error?.message || "Could not start Remita payment");
        }
        const callbackUrl = `/registration/remita-callback?reg=${data.id}`;
        try {
          await payWithRemita({
            rrr: data.rrr,
            publicKey: data.fields.publicKey,
            orderId: data.orderId,
            widgetHost: data.fields.widgetHost,
            onSuccess: () => {
              window.location.href = callbackUrl;
            },
            onClose: () => {
              // Widget was dismissed. Do NOT auto-redirect — the user may not
              // have paid. Show a toast with a link so they can verify later.
              toast({
                title: "Payment window closed",
                description: `If you completed payment, check status with RRR ${data.rrr}.`,
              });
              setSubmitting(false);
            },
            onError: (resp) => {
              console.error("Remita widget error", resp);
              toast({
                title: "Payment error",
                description: `Could not load the payment widget. Your RRR is ${data.rrr} — you can pay at any bank or on the Remita app, then verify on the Payment Status page.`,
                variant: "destructive",
              });
              setSubmitting(false);
            },
          });
        } catch (widgetErr) {
          const msg = widgetErr instanceof Error ? widgetErr.message : "Payment widget failed to load";
          toast({
            title: "Payment widget unavailable",
            description: `${msg} Your RRR is ${data.rrr} — you can pay via any bank or on the Remita app.`,
            variant: "destructive",
          });
          setSubmitting(false);
          return;
        }
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
          content={`Register for the NICE ${CONFERENCE.edition}, ${CONFERENCE.dates.displayLong}, ${CONFERENCE.venue.name}. Select your category and pay securely online with Remita.`}
        />
        <link
          rel="canonical"
          href={typeof window !== "undefined" ? window.location.href : "/registration"}
        />
      </Helmet>

      <header className="mb-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold">Conference Registration</h1>
        <p className="text-muted-foreground mt-2">
          Secure your place at the NICE {CONFERENCE.edition}. Physical
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
              <Field label="Institution" error={errors.institution?.message} required>
                <Input {...register("institution")} placeholder="University / Body" />
              </Field>
              <Field label="Organization / Employer" error={errors.organization?.message}>
                <Input {...register("organization")} placeholder="Company name (if different)" />
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
              <div className="flex items-start gap-3 rounded-lg border border-brand-primary bg-brand-primary/5 p-4">
                <CreditCard className="h-5 w-5 mt-0.5 text-brand-primary" />
                <div>
                  <p className="font-medium">Pay with Remita</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pay online now via card, bank or USSD — instant confirmation.
                  </p>
                </div>
              </div>

              <Alert>
                <CreditCard className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  {PAYMENT_INFO.remita.instructions}
                </AlertDescription>
              </Alert>

            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Days Attending</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Select the conference days you plan to attend (Oct 20–22, 2026).
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { id: "1", label: "Day 1 — Oct 20" },
                  { id: "2", label: "Day 2 — Oct 21" },
                  { id: "3", label: "Day 3 — Oct 22" },
                ].map((d) => {
                  const checked = selectedDays.includes(d.id as "1" | "2" | "3");
                  return (
                    <label
                      key={d.id}
                      className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 ${
                        checked ? "border-brand-primary bg-brand-primary/5" : ""
                      }`}
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(v) => {
                          const next = new Set(selectedDays);
                          if (v === true) next.add(d.id as "1" | "2" | "3");
                          else next.delete(d.id as "1" | "2" | "3");
                          setValue(
                            "daysAttending",
                            Array.from(next).sort() as ("1" | "2" | "3")[],
                            { shouldValidate: true }
                          );
                        }}
                      />
                      <span className="text-sm font-medium">{d.label}</span>
                    </label>
                  );
                })}
              </div>
              {errors.daysAttending && (
                <p className="text-xs text-destructive">{errors.daysAttending.message as string}</p>
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
              <p className="text-xs text-muted-foreground">
                Early bird ends {new Date(EARLY_BIRD_CUTOFF_ISO).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}.
              </p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 text-[11px] uppercase tracking-wide text-muted-foreground border-b pb-1">
                <span>Category</span>
                <span className="text-right">Early Bird</span>
                <span className="text-right">Late</span>
              </div>
              {REGISTRATION_CATEGORIES.map((c) => (
                <div
                  key={c.id}
                  className="grid grid-cols-[1fr_auto_auto] gap-x-4 items-center border-b last:border-0 pb-2 last:pb-0"
                >
                  <span className="text-muted-foreground">{c.label}</span>
                  <span className={`text-right font-medium ${earlyBird ? "text-brand-primary" : ""}`}>
                    {formatNaira(c.earlyBird)}
                  </span>
                  <span className={`text-right font-medium ${!earlyBird ? "text-brand-primary" : "text-muted-foreground"}`}>
                    {formatNaira(c.regular)}
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
