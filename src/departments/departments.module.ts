import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsResolver } from './departments.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [DepartmentsService, DepartmentsResolver, PrismaService],
})
export class DepartmentsModule {}
