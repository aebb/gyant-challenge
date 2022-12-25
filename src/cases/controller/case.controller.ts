import {
  ClassSerializerInterceptor,
  Controller, Get, Patch, UseGuards, UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../users/utils/jwt.guard';
import { RoleGuard } from '../../users/utils/role.guard';
import { Roles } from '../../users/utils/role.decorator';
import { Role } from '../../users/entity/user.role';
import { CaseUpdate } from '../dto/request/case.update.decorator';
import { CaseUpdateRequest } from '../dto/request/case.update.request';
import { CaseService } from '../service/case.service';
import { CaseResponse } from '../dto/response/case.response';

@Controller('case')
export class CaseController {
  public constructor(
    private service: CaseService,
  ) {
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Doctor)
  @UseInterceptors(ClassSerializerInterceptor)
  public async executeCaseUpdate(@CaseUpdate() request: CaseUpdateRequest): Promise<CaseResponse> {
    return this.service.updateOpenCase(request);
  }

  @Get('open')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Doctor)
  @UseInterceptors(ClassSerializerInterceptor)
  public async executeGetOpenCase(): Promise<CaseResponse> {
    return this.service.findOpenCase();
  }
}
