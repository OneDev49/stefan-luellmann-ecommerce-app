import { z } from 'zod';

export const profileFormSchema = z.object({
  firstName: z.string().max(32, 'First Name is too long.').optional(),
  lastName: z.string().max(32, 'Last Name is too long.').optional(),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, 'Invalid Phone Number format.')
    .min(8, 'Phone Number is too short.')
    .max(48, 'Phone Number is too long.')
    .optional(),
  birthDate: z.string().optional(),
  gender: z.string().max(16, 'Gender is too long.').optional(),
  street: z.string().max(32, 'Street Name is too long.').optional(),
  zipCode: z
    .string()
    .regex(/^\d+$/, 'Invalid ZIP Code format.')
    .max(16, 'Zip Code is too long.')
    .optional(),
  city: z.string().max(48, 'City Name is too long.').optional(),
  country: z.string().max(48, 'Country Name is too long.').optional(),
});

export type TProfileFormSchema = z.infer<typeof profileFormSchema>;

type TProfileApiData = Omit<TProfileFormSchema, 'birthDate'> & {
  birthDate?: Date | null;
};

export const profileApiSchema = profileFormSchema.transform((data) => {
  const processedData: Record<string, string | Date | null | undefined> = {};

  for (const key in data) {
    const typedKey = key as keyof typeof data;
    processedData[typedKey] = data[typedKey] === '' ? null : data[typedKey];
  }

  if (processedData.birthDate) {
    processedData.birthDate = new Date(processedData.birthDate);
  }

  return processedData as TProfileApiData;
});
