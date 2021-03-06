import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    Query,
    UsePipes,
    ValidationPipe,
    ParseIntPipe,
    UseGuards,
    Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
export class TasksController {
    private logger = new Logger('TasksController');
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
        this.logger.verbose(`Retrieving all tasks. Filter: ${JSON.stringify(filterDto)}`);
        return this.tasksService.getTasks(filterDto);
    }

    @Get('/:id')
    async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User): Promise<Task> {
        this.logger.verbose(
            `User "${user.username}" creating a new task. Data: ${JSON.stringify(createTaskDto)}`,
        );
        return this.tasksService.createTask(createTaskDto, user);
    }

    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void> {
        return this.tasksService.deleteTask(id, user);
    }

    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
