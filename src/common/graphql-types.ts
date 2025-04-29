import { Field, ObjectType, Int, InputType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

// GraphQL Input Type for Pagination
@InputType()
export class PaginationInput {
  @Field(() => Int, {
    nullable: true,
    description: 'Number of items to take',
    defaultValue: 10,
  })
  take?: number;

  @Field(() => Int, {
    nullable: true,
    description: 'Number of items to skip',
    defaultValue: 0,
  })
  skip?: number;
}

//  GraphQL type for SubDepartment
@ObjectType()
export class SubDepartment {
  @Field(() => String)
  id: string;

  @Field()
  name: string;

  @Field(() => String)
  departmentId: string;
}

//  GraphQL type for Department
@ObjectType()
export class DepartmentType {
  @Field(() => String)
  id: string;

  @Field()
  name: string;

  @Field(() => [SubDepartment], { nullable: 'itemsAndList' })
  subDepartments?: SubDepartment[] | null;
}

// Generic factory function for creating Paginated Response types
export function PaginatedResponse<TItem>(TItemClass: Type<TItem>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(() => [TItemClass])
    items: TItem[];

    @Field(() => Int)
    totalCount: number;
  }
  return PaginatedResponseClass;
}

@ObjectType()
export class PaginatedDepartmentResponse extends PaginatedResponse(
  DepartmentType,
) {}
