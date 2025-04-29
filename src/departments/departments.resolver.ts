import {
  Resolver,
  Query,
  Mutation,
  Args,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentInput } from './dto/create-department.dto';
import { UpdateDepartmentInput } from './dto/update-department.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SubDepartment } from '../common/graphql-types';

@ObjectType()
export class Department {
  @Field(() => String)
  id: string;

  @Field()
  name: string;

  @Field(() => [SubDepartment], { nullable: true })
  subDepartments?: SubDepartment[];
}

@Resolver(() => Department)
@UseGuards(JwtAuthGuard) // Protect all resolver methods with the JWT guard
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Query(() => Department, { name: 'getDepartmentById', nullable: true }) // Add new query
  async getDepartmentById(@Args('id', { type: () => String }) id: string) {
    return this.departmentsService.getDepartmentById(id);
  }

  @Mutation(() => Department)
  async createDepartment(
    @Args('input', { type: () => CreateDepartmentInput })
    createDepartmentInput: CreateDepartmentInput,
  ) {
    return this.departmentsService.createDepartment(
      createDepartmentInput as any,
    );
  }

  @Mutation(() => Department)
  async updateDepartment(
    @Args('input', { type: () => UpdateDepartmentInput })
    updateDepartmentInput: UpdateDepartmentInput,
  ) {
    return this.departmentsService.updateDepartment(
      updateDepartmentInput as any,
    );
  }

  @Mutation(() => Department)
  async deleteDepartment(@Args('id', { type: () => String }) id: string) {
    return this.departmentsService.deleteDepartment(id);
  }
}
