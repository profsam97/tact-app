import * as z from 'zod';
import { Field, InputType } from '@nestjs/graphql';

// Schema for updating a sub-department
const UpdateSubDepartmentSchema = z.object({
  id: z.string().uuid('Invalid Sub-department ID format'),
  name: z
    .string()
    .min(2, 'Sub-department name must be at least 2 characters long')
    .optional(), // Since name is optional for update
});

export type UpdateSubDepartmentSchema = z.infer<
  typeof UpdateSubDepartmentSchema
>;

// Define GraphQL Input Type for updating a sub-department
@InputType()
export class UpdateSubDepartmentInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;
}
