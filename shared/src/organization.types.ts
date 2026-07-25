import z from "zod/v4";

export const addOrganizationSchema = z.object({
    name: z.string().min(2, "Name is required and should be atleast 2 character long"),
    address: z.string().min(5, "Address is required and should be atleast 5 characters long"),
    gst: z.string().optional()
})

export type AddOrganization = z.infer<typeof addOrganizationSchema>;