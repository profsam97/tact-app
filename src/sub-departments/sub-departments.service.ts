import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubDepartmentSchema } from './dto/create-sub-department.dto';
import { UpdateSubDepartmentSchema } from './dto/update-sub-department.dto';
import { SubDepartment } from '@prisma/client';

@Injectable()
export class SubDepartmentsService {
  constructor(private prisma: PrismaService) {}

  async createSubDepartment(
    data: CreateSubDepartmentSchema,
  ): Promise<SubDepartment> {
    const { name, departmentId } = data;

    //  Check if the parent department exists
    const department = await this.prisma.department.findUnique({
      where: { id: departmentId },
    });
    //if it does not, we throw an error
    if (!department) {
      throw new NotFoundException(
        `Department with ID ${departmentId} not found`,
      );
    }

    return this.prisma.subDepartment.create({
      data: {
        name,
        department: {
          connect: { id: departmentId },
        },
      },
    });
  }

  async getSubDepartments(): Promise<SubDepartment[]> {
    return this.prisma.subDepartment.findMany();
  }

  async getSubDepartmentById(id: string): Promise<SubDepartment | null> {
    return this.prisma.subDepartment.findUnique({
      where: { id },
    });
  }

  async updateSubDepartment(
    data: UpdateSubDepartmentSchema,
  ): Promise<SubDepartment> {
    const { id, name } = data;

    const subDepartment = await this.prisma.subDepartment.findUnique({
      where: { id },
    });

    if (!subDepartment) {
      throw new NotFoundException(`Sub-department with ID ${id} not found`);
    }

    return this.prisma.subDepartment.update({
      where: { id },
      data: {
        name,
      },
    });
  }

  async deleteSubDepartment(id: string): Promise<SubDepartment> {
    const subDepartment = await this.prisma.subDepartment.findUnique({
      where: { id },
    });

    if (!subDepartment) {
      throw new NotFoundException(`Sub-department with ID ${id} not found`);
    }

    return this.prisma.subDepartment.delete({
      where: { id },
    });
  }
}
