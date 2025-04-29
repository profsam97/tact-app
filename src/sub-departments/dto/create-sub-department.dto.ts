import * as z from 'zod';
import { Field, InputType } from '@nestjs/graphql';

// Schema for creating a sub-department
const CreateSubDepartmentSchema = z.object({
  name: z
    .string()
    .min(2, 'Sub-department name must be at least 2 characters long'),
  departmentId: z.string().uuid('Invalid Department ID format'),
});

export type CreateSubDepartmentSchema = z.infer<
  typeof CreateSubDepartmentSchema
>;

@InputType()
export class CreateSubDepartmentInput {
  @Field()
  name: string;

  @Field()
  departmentId: string;
}
