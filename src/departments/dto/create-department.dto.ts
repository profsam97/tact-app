import * as z from 'zod';
import { Field, InputType } from '@nestjs/graphql';

// Schema for creating a department
const CreateDepartmentSchema = z.object({
  name: z.string().min(2, 'Department name must be at least 2 characters long'),
  subDepartments: z
    .array(
      z.object({
        name: z
          .string()
          .min(2, 'Sub-department name must be at least 2 characters long'),
      }),
    )
    .optional()
    .nullable(),
});

export type CreateDepartmentSchema = z.infer<typeof CreateDepartmentSchema>;

// Define an embedded sub-department input specifically for department creation
@InputType()
export class CreateEmbeddedSubDepartmentInput {
  @Field()
  name: string;
}

//  GraphQL Input Type for creating a department
@InputType()
export class CreateDepartmentInput {
  @Field()
  name: string;

  @Field(() => [CreateEmbeddedSubDepartmentInput], { nullable: true })
  subDepartments?: CreateEmbeddedSubDepartmentInput[] | null;
}
