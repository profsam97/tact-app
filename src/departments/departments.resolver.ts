import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentInput } from './dto/create-department.dto';
import { UpdateDepartmentInput } from './dto/update-department.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  DepartmentType,
  PaginationInput,
  PaginatedDepartmentResponse,
} from '../common/graphql-types';

@Resolver(() => DepartmentType)
@UseGuards(JwtAuthGuard)
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Query(() => PaginatedDepartmentResponse, { name: 'getDepartments' })
  async getDepartments(
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination: PaginationInput,
  ) {
    const effectivePagination = pagination ?? { skip: 0, take: 10 };
    return this.departmentsService.getDepartments(effectivePagination);
  }

  @Query(() => DepartmentType, { name: 'getDepartmentById', nullable: true })
  async getDepartmentById(@Args('id', { type: () => String }) id: string) {
    return this.departmentsService.getDepartmentById(id);
  }

  @Mutation(() => DepartmentType)
  async createDepartment(
    @Args('input', { type: () => CreateDepartmentInput })
    createDepartmentInput: CreateDepartmentInput,
  ) {
    return this.departmentsService.createDepartment(
      createDepartmentInput as any,
    );
  }

  @Mutation(() => DepartmentType)
  async updateDepartment(
    @Args('input', { type: () => UpdateDepartmentInput })
    updateDepartmentInput: UpdateDepartmentInput,
  ) {
    return this.departmentsService.updateDepartment(
      updateDepartmentInput as any,
    );
  }

  @Mutation(() => DepartmentType)
  async deleteDepartment(@Args('id', { type: () => String }) id: string) {
    return this.departmentsService.deleteDepartment(id);
  }
}
