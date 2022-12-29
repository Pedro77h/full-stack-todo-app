import { NotFoundSwagger } from './../../helpers/swagger/not-found.swagger';
import { BadRequestSwagger } from './../../helpers/swagger/bad-request.swagger';
import { IndexTodoSwagger } from './swagger/index-todo.swagger';
import { UpdateTodoDTO } from './dto/update-todo.dto';
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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTodoSwagger } from './swagger/create-todo.swagger';
import { TodoEntity } from './entity/todo.entity';
import { ShowTodoSwagger } from './swagger/show-todo.swagger.';
import { UpdateTodoSwagger } from './swagger/update-todo.swagger';

@Controller('api/v1/todos')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Todos' })
  @ApiResponse({
    status: 200,
    description: 'successfully list todos',
    type: IndexTodoSwagger,
    isArray: true,
  })
  async index(): Promise<TodoEntity[]> {
    return await this.todoService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create new todo' })
  @ApiResponse({
    status: 201,
    description: 'successfully create todo ',
    type: CreateTodoSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'invalid parameters',
    type: BadRequestSwagger,
  })
  async create(@Body() body: CreateTodoDTO): Promise<TodoEntity> {
    return await this.todoService.create(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'find one todo by id' })
  @ApiResponse({
    status: 200,
    description: 'data of one todo',
    type: ShowTodoSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'todo not found',
    type: NotFoundSwagger,
  })
  async show(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<TodoEntity> {
    return await this.todoService.findOneOrFail(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update todo by id' })
  @ApiResponse({
    status: 200,
    description: 'successfully update todo',
    type: UpdateTodoSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'invalid parameters',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'todo not found',
    type: NotFoundSwagger,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() Body: UpdateTodoDTO,
  ): Promise<TodoEntity> {
    return await this.todoService.update(id, Body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete todo by id' })
  @ApiResponse({ status: 204, description: 'successfully delete todo' })
  @ApiResponse({
    status: 404,
    description: 'todo not found',
    type: NotFoundSwagger,
  })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.todoService.deleteById(id);
  }
}
