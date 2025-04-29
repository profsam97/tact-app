import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDepartmentSchema } from './dto/create-department.dto';
import { UpdateDepartmentSchema } from './dto/update-department.dto';
import { Department, SubDepartment } from '@prisma/client';

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

  async getDepartments(): Promise<
    (Department & { subDepartments: SubDepartment[] })[]
  > {
    return this.prisma.department.findMany({
      include: {
        subDepartments: true,
      },
    });
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
