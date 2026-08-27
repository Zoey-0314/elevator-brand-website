import { z } from "zod";

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120, "Name is too long."),
  company: optionalText(160),
  email: z.email("Enter a valid email address.").max(254),
  phone: optionalText(80),
  country: z.string().trim().min(2, "Please enter a country.").max(120),
  product: optionalText(120),
  projectType: optionalText(120),
  quantity: optionalText(80),
  message: z.string().trim().min(20, "Please include at least 20 characters.").max(4000, "Message is too long."),
  privacyConsent: z.boolean().refine(Boolean, "Consent is required."),
  turnstileToken: z.string().trim().min(1, "Complete the security check.").max(2048),
  sourcePage: optionalText(500),
}).strict();

export const inquiryStatuses = ["new", "contacted", "quoted", "won", "closed"] as const;
export const inquiryStatusSchema = z.enum(inquiryStatuses);
export type InquiryStatus = z.infer<typeof inquiryStatusSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;

export function normalizeInquiry(input: InquiryInput) {
  const blankToNull = (value?: string) => value?.trim() || null;
  return {
    name: input.name.trim(),
    company: blankToNull(input.company),
    email: input.email.trim().toLowerCase(),
    phone: blankToNull(input.phone),
    country: input.country.trim(),
    product: blankToNull(input.product),
    project_type: blankToNull(input.projectType),
    quantity: blankToNull(input.quantity),
    message: input.message.trim(),
    source_page: blankToNull(input.sourcePage),
  };
}
