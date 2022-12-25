import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CaseUpdateRequest } from './case.update.request';

export const CaseUpdate = createParamDecorator(
  (data, ctx: ExecutionContext): CaseUpdateRequest => {
    const req = ctx.switchToHttp().getRequest();
    return new CaseUpdateRequest(
      req.params.id,
      req.body.conditionId,
      req.user,
      req.body.timeToLabel,
    );
  },
);
