import { Repository, EntityRepository } from 'typeorm';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
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

        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();

        return task;
    }
}
