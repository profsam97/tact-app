import { Module } from '@nestjs/common';
import { SubDepartmentsService } from './sub-departments.service';
import { SubDepartmentsResolver } from './sub-departments.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SubDepartmentsResolver, SubDepartmentsService, PrismaService],
  exports: [SubDepartmentsService],
})
export class SubDepartmentsModule {}
