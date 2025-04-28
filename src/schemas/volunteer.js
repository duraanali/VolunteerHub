import { z } from 'zod';

export const volunteerSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  
  email: z.string()
    .email('Invalid email address')
    .min(1, 'Email is required')
    .transform(val => val.trim()),
  
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits'),
  
  address: z.string()
    .min(5, 'Please enter a complete address')
    .max(100, 'Address must be less than 100 characters'),
  
  city: z.string()
    .min(2, 'City name must be at least 2 characters')
    .max(50, 'City name must be less than 50 characters'),
  
  state: z.string()
    .length(2, 'State must be exactly 2 characters')
    .toUpperCase(),
  
  zip: z.string()
    .min(5, 'ZIP code must be at least 5 digits')
    .max(10, 'ZIP code must be less than 10 digits'),
  
  availability: z.array(z.string())
    .min(1, 'Please select at least one availability option'),
  
  skills: z.array(z.string())
    .min(1, 'Please select at least one skill'),
  
  experience: z.string()
    .max(1000, 'Experience must be less than 1000 characters')
    .optional(),
  
  interests: z.string()
    .min(1, 'Please share your areas of interest')
    .max(500, 'Interests must be less than 500 characters'),
  
  referral: z.string()
    .min(1, 'Please select a referral source'),
  
  emergencyContact: z.string()
    .min(2, 'Emergency contact name must be at least 2 characters')
    .max(100, 'Emergency contact name must be less than 100 characters'),
  
  emergencyPhone: z.string()
    .min(10, 'Emergency phone must be at least 10 digits')
    .max(15, 'Emergency phone must be less than 15 digits')
});