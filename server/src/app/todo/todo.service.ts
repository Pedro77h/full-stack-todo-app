import { TodoEntity } from './entity/todo.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteQueryBuilder, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async findAll() {
    return await this.todoRepository.find();
  }

  async findOneOrFail(id: string) {
    try {
      return await this.todoRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async create(data) {
    return await this.todoRepository.save(this.todoRepository.create(data));
  }

  async update(id: string, data) {
    const todo = await this.todoRepository.findOneOrFail({
      where: {
        id,
      },
    });

    this.todoRepository.merge(todo, data);

    return await this.todoRepository.save(todo);
  }

  async deleteByid(id: string) {
    try {
      await this.todoRepository.findOneOrFail({
        where: {
          id,
        },
      });

      await this.todoRepository.softDelete(id);

    } catch (err) {
      throw new NotFoundException(err.message);
    }
    
  }
}
