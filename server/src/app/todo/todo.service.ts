import { UpdateTodoDTO } from './dto/update-todo.dto';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { TodoEntity } from './entity/todo.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import {Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async findAll() {
    return await this.todoRepository.find({order: {createdAt: 'DESC'}});
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

  async create(data:CreateTodoDTO) {
    return await this.todoRepository.save(this.todoRepository.create(data));
  }

  async update(id: string, data:UpdateTodoDTO) {
    const todo = await this.findOneOrFail(id);

    this.todoRepository.merge(todo, data);

    return await this.todoRepository.save(todo);
  }

  async deleteById(id: string) {
    try {
      await this.findOneOrFail(id);

      await this.todoRepository.softDelete(id);

    } catch (err) {
      throw new NotFoundException(err.message);
    }
    
  }
}
