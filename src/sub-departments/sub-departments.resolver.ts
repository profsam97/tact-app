import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubDepartmentsService } from './sub-departments.service';
import { CreateSubDepartmentInput } from './dto/create-sub-department.dto';
import { UpdateSubDepartmentInput } from './dto/update-sub-department.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SubDepartment } from '../common/graphql-types';
import { UseGuards } from '@nestjs/common';

@Resolver(() => SubDepartment) // Associate resolver with the SubDepartment type
@UseGuards(JwtAuthGuard) // Protect all resolver methods with the JWT guard
export class SubDepartmentsResolver {
  constructor(private readonly subDepartmentsService: SubDepartmentsService) {}

  @Query(() => [SubDepartment], { name: 'getSubDepartments' })
  async getSubDepartments() {
    return this.subDepartmentsService.getSubDepartments();
  }

  @Query(() => SubDepartment, { name: 'getSubDepartmentById', nullable: true })
  async getSubDepartmentById(@Args('id', { type: () => String }) id: string) {
    return this.subDepartmentsService.getSubDepartmentById(id);
  }

  @Mutation(() => SubDepartment)
  async createSubDepartment(
    @Args('input', { type: () => CreateSubDepartmentInput })
    createSubDepartmentInput: CreateSubDepartmentInput,
  ) {
    return this.subDepartmentsService.createSubDepartment(
      createSubDepartmentInput as any,
    );
  }

  @Mutation(() => SubDepartment)
  async updateSubDepartment(
    @Args('input', { type: () => UpdateSubDepartmentInput })
    updateSubDepartmentInput: UpdateSubDepartmentInput,
  ) {
    return this.subDepartmentsService.updateSubDepartment(
      updateSubDepartmentInput as any,
    );
  }

  @Mutation(() => SubDepartment)
  async deleteSubDepartment(@Args('id', { type: () => String }) id: string) {
    return this.subDepartmentsService.deleteSubDepartment(id);
  }
}
