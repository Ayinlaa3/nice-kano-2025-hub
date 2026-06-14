import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  CalendarDays,
  MapPin,
  CheckCircle2,
  Info,
  Landmark,
  CreditCard,
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
  paymentMethod: z.enum(["bank_transfer", "remita"], {
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

export default function Registration() {
  const [submitted, setSubmitted] = useState<FormValues | null>(null);

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
      paymentMethod: "bank_transfer",
      dietary: "",
      comments: "",
    },
  });

  const selectedCategory = watch("category");
  const selectedPayment = watch("paymentMethod");
  const earlyBird = isEarlyBird();

  const fee = useMemo(
    () => getCategoryFee(selectedCategory ?? ""),
    [selectedCategory]
  );

  const onSubmit = (values: FormValues) => {
    setSubmitted(values);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    const submittedFee = getCategoryFee(submitted.category);
    const categoryLabel = REGISTRATION_CATEGORIES.find(
      (c) => c.id === submitted.category
    )?.label;
    return (
      <div className="container mx-auto py-12 md:py-16 max-w-3xl">
        <Helmet>
          <title>Registration Received | NICE {CONFERENCE.shortName}</title>
        </Helmet>
        <Card className="border-t-4 border-t-brand-primary">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-brand-primary" />
            </div>
            <CardTitle className="text-2xl">Registration Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Almost there — complete your payment</AlertTitle>
              <AlertDescription>
                Your details are summarised below. Online booking storage and
                automated payment confirmation are being finalised. For now,
                please complete payment using the instructions below and present
                your receipt at the on-site registration desk.
              </AlertDescription>
            </Alert>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <Detail label="Full Name" value={submitted.fullName} />
              <Detail label="Email" value={submitted.email} />
              <Detail label="Phone" value={submitted.phone} />
              <Detail label="Institution" value={submitted.institution} />
              {submitted.chapter && (
                <Detail label="Chapter" value={submitted.chapter} />
              )}
              <Detail label="Membership" value={submitted.membershipStatus} />
              <Detail label="Category" value={categoryLabel ?? ""} />
              <Detail
                label="Payment Method"
                value={
                  submitted.paymentMethod === "bank_transfer"
                    ? "Bank Transfer"
                    : "Remita / Online"
                }
              />
            </div>

            <div className="rounded-lg bg-brand-primary/5 ring-1 ring-brand-primary/20 p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Amount due</p>
                <p className="text-2xl font-bold text-brand-primary">
                  {submittedFee ? formatNaira(submittedFee.amount) : "—"}
                </p>
              </div>
              {submittedFee?.isEarly && (
                <Badge className="bg-brand-yellow text-brand-gold-foreground">
                  Early Bird Rate
                </Badge>
              )}
            </div>

            <div className="rounded-lg border p-5">
              <h3 className="font-semibold flex items-center gap-2 mb-2">
                {submitted.paymentMethod === "bank_transfer" ? (
                  <Landmark className="h-4 w-4 text-brand-primary" />
                ) : (
                  <CreditCard className="h-4 w-4 text-brand-primary" />
                )}
                Payment Instructions
              </h3>
              <p className="text-sm text-muted-foreground">
                {submitted.paymentMethod === "bank_transfer"
                  ? PAYMENT_INFO.bankTransfer.instructions
                  : PAYMENT_INFO.remita.instructions}
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setSubmitted(null)} variant="professional">
                Edit / Register Another
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 md:py-16">
      <Helmet>
        <title>
          Register | NICE {CONFERENCE.shortName} Conference {CONFERENCE.year}
        </title>
        <meta
          name="description"
          content={`Register for the NICE ${CONFERENCE.edition} & AGM, ${CONFERENCE.dates.displayLong}, ${CONFERENCE.venue.name}. Choose your category and view conference fees.`}
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
                defaultValue="bank_transfer"
                onValueChange={(v) =>
                  setValue("paymentMethod", v as FormValues["paymentMethod"], {
                    shouldValidate: true,
                  })
                }
                className="grid sm:grid-cols-2 gap-3"
              >
                <label
                  htmlFor="pay-bank"
                  className="flex items-start gap-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 [&:has([data-state=checked])]:border-brand-primary"
                >
                  <RadioGroupItem value="bank_transfer" id="pay-bank" />
                  <span>
                    <span className="font-medium flex items-center gap-2">
                      <Landmark className="h-4 w-4" /> Bank Transfer
                    </span>
                    <span className="block text-xs text-muted-foreground mt-1">
                      Pay directly to the NICE conference account.
                    </span>
                  </span>
                </label>
                <label
                  htmlFor="pay-remita"
                  className="flex items-start gap-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 [&:has([data-state=checked])]:border-brand-primary"
                >
                  <RadioGroupItem value="remita" id="pay-remita" />
                  <span>
                    <span className="font-medium flex items-center gap-2">
                      <CreditCard className="h-4 w-4" /> Remita / Online
                    </span>
                    <span className="block text-xs text-muted-foreground mt-1">
                      Card &amp; Remita checkout (coming soon).
                    </span>
                  </span>
                </label>
              </RadioGroup>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  {selectedPayment === "bank_transfer"
                    ? PAYMENT_INFO.bankTransfer.instructions
                    : PAYMENT_INFO.remita.instructions}
                </AlertDescription>
              </Alert>
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
                    setValue("consent", v === true, { shouldValidate: true })
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

              <Button type="submit" variant="professional" size="lg" className="w-full">
                Submit Registration
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
