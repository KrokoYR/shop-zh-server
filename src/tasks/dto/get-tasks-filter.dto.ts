import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    @ApiPropertyOptional()
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    @ApiPropertyOptional()
    search: string;
}
