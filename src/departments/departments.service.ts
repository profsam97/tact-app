import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDepartmentSchema } from './dto/create-department.dto';
import { UpdateDepartmentSchema } from './dto/update-department.dto';
import { Department, SubDepartment } from '@prisma/client';
import {
  PaginationInput,
  PaginatedDepartmentResponse,
} from '../common/graphql-types'; // Import pagination types

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) {}

  async createDepartment(data: CreateDepartmentSchema): Promise<Department> {
    const { name, subDepartments } = data;
    return this.prisma.department.create({
      data: {
        name,
        subDepartments: {
          create: subDepartments?.map((sub) => ({ name: sub.name })),
        },
      },
      include: {
        subDepartments: true, // Include sub-departments in the response
      },
    });
  }

  async getDepartmentById(
    id: string,
  ): Promise<(Department & { subDepartments: SubDepartment[] }) | null> {
    return this.prisma.department.findUnique({
      where: { id },
      include: {
        subDepartments: true, // Include sub-departments in the response
      },
    });
  }

  async getDepartments(
    pagination: PaginationInput,
  ): Promise<PaginatedDepartmentResponse> {
    const { take = 10, skip = 0 } = pagination; // Default values if not provided
    const [items, totalCount] = await this.prisma.$transaction([
      this.prisma.department.findMany({
        take,
        skip,
        include: {
          subDepartments: true,
        },
        orderBy: {
          // Optional: Add default sorting if desired
          createdAt: 'desc',
        },
      }),
      this.prisma.department.count(), // Get total count of departments
    ]);

    return { items, totalCount };
  }

  async updateDepartment(data: UpdateDepartmentSchema): Promise<Department> {
    const { id, name } = data;

    const department = await this.prisma.department.findUnique({
      where: { id },
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    return this.prisma.department.update({
      where: { id },
      data: {
        name,
      },
      include: {
        subDepartments: true,
      },
    });
  }

  async deleteDepartment(id: string): Promise<Department> {
    const department = await this.prisma.department.findUnique({
      where: { id },
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    return this.prisma.department.delete({
      where: { id },
    });
  }
}
