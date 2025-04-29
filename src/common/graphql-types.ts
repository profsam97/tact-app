import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SubDepartment {
  @Field(() => String)
  id: string;

  @Field()
  name: string;

  @Field(() => String)
  departmentId: string;
}
