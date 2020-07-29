import { Repository, EntityRepository } from 'typeorm';
import { Logger, InternalServerErrorException } from '@nestjs/common';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    private logger = new Logger('TaskRepository');

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        // Queru builder is helpful to create custom queries to DB
        const query = this.createQueryBuilder('task');

        if (status) {
            // "andWhere" will not override others conditions, but "where" will.
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            // %@param@% is made for partial matching
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', {
                search: `%${search}%`,
            });
        }

        try {
            const tasks = await query.getMany();
            return tasks;
        } catch (error) {
            this.logger.error(
                `Failed to get all tasks Filters: ${JSON.stringify(filterDto)}`,
                error.stack,
            );
            throw new InternalServerErrorException();
        }
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        try {
            await task.save();
        } catch (error) {
            this.logger.error(
                `Failed to create a task for user ${user.username}. Data: ${JSON.stringify(
                    createTaskDto,
                )}`,
                error.stack,
            );
            throw new InternalServerErrorException();
        }

        // Before returning user deleting user information:
        delete task.user;
        return task;
    }
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iktyb2tvMSIsImlhdCI6MTU5NTkxNDAzNCwiZXhwIjoxNTk1OTE3NjM0fQ.fZJG2gMYuGJmnlJUAq8IflOkwLz6K3FcFr1UPW8jIDA
