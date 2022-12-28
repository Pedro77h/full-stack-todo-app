import { CreateTodoDTO } from './dto/create-todo.dto';
import { TodoService } from './todo.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

@Controller('api/v1/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async index() {
    return await this.todoService.findAll();
  }

  @Post()
  async create(@Body() body: CreateTodoDTO) {
    return await this.todoService.create(body);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.findOneOrFail(id);
  }

  @Put(':id')
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() Body) {
    return await this.todoService.update(id, Body);
  }

  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param('id' , new ParseUUIDPipe()) id: string) {
   await this.todoService.deleteByid(id)
 }
}
