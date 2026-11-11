import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const inquiryFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  serviceType: z.enum(["cinematography", "photography", "events", "retainer"]).describe("Select a service"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  details: z.string().min(20, "Please provide more details about your project"),
  website: z.string().optional(),
});

export type InquiryFormData = z.infer<typeof inquiryFormSchema>;
