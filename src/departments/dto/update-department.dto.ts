import * as z from 'zod';
import { Field, InputType } from '@nestjs/graphql';

// Schema for updating a department
const UpdateDepartmentSchema = z.object({
  id: z.string().uuid('Invalid Department ID format'),
  name: z
    .string()
    .min(2, 'Department name must be at least 2 characters long')
    .optional(), // Name is optional for update
});

export type UpdateDepartmentSchema = z.infer<typeof UpdateDepartmentSchema>;

// Define GraphQL Input Type for updating a department
@InputType()
export class UpdateDepartmentInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;
}
