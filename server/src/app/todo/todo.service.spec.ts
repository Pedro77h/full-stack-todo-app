import { UpdateTodoDTO } from './dto/update-todo.dto';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { NotFoundException } from '@nestjs/common';
import { TodoEntity } from './entity/todo.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodoService } from './todo.service';
import { Repository } from 'typeorm';

const todoEntityList: TodoEntity[] = [
  new TodoEntity({ task: 'task-1', isDone: 0 }),
  new TodoEntity({ task: 'task-1', isDone: 0 }),
  new TodoEntity({ task: 'task-1', isDone: 0 }),
];

const updateTodoEntityItem = new TodoEntity({ task: 'task-1', isDone: 1 });

describe('TodoService', () => {
  let todoService: TodoService;
  let todoRepository: Repository<TodoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(TodoEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(todoEntityList),
            findOneOrFail: jest.fn().mockResolvedValue(todoEntityList[0]),
            save: jest.fn().mockResolvedValue(todoEntityList[0]),
            create: jest.fn().mockReturnValue(todoEntityList[0]),
            merge: jest.fn().mockReturnValue(todoEntityList[0]),
            softDelete: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
    todoRepository = module.get<Repository<TodoEntity>>(
      getRepositoryToken(TodoEntity),
    );
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
    expect(todoRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a todo entity list entity successfully', async () => {
      //Act
      const result = await todoService.findAll();

      //Assert
      expect(result).toEqual(todoEntityList);
      expect(todoRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(todoRepository, 'find').mockRejectedValueOnce(new Error());

      //Assert
      expect(todoService.findAll()).rejects.toThrowError();
    });
  });

  describe('FindOneOrFail', () => {
    it('should return a todo entity item successfully', async () => {
      //Act
      const result = await todoService.findOneOrFail('1');

      //Assert
      expect(result).toEqual(todoEntityList[0]);
      expect(todoRepository.findOneOrFail).toBeCalledTimes(1);
    });
    it('should throw a not found exception', () => {
      //Arrange
      jest
        .spyOn(todoRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      //Assert
      expect(todoService.findOneOrFail('1')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new todo entity item successfully', async () => {
      //Arrange
      const data: CreateTodoDTO = {
        task: 'task-1',
        isDone: 0,
      };

      //Act
      const result = await todoService.create(data);

      //Assert
      expect(result).toEqual(todoEntityList[0]);
      expect(todoRepository.create).toBeCalledTimes(1);
      expect(todoRepository.save).toBeCalledTimes(1);
    });

    it('should throw an exception', () => {
      //Arrange
      const data: CreateTodoDTO = {
        task: 'task-1',
        isDone: 0,
      };

      jest.spyOn(todoRepository, 'save').mockRejectedValueOnce(new Error());

      //Assert
      expect(todoService.create(data)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a todo entity item successfully', async () => {
      //Arrange
      const data: UpdateTodoDTO = {
        task: 'task-1',
        isDone: 1,
      };

      jest
        .spyOn(todoRepository, 'save')
        .mockResolvedValueOnce(updateTodoEntityItem);

      //Act
      const result = await todoService.update('1', data);

      //Assert
      expect(result).toEqual(updateTodoEntityItem);
    });

    it('should throw a not found exception', () => {
      //Arrange
      jest
        .spyOn(todoRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      const data: UpdateTodoDTO = {
        task: 'task-1',
        isDone: 1,
      };

      //Assert
      expect(todoService.update('1', data)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw an exception', () => {
      //Arrange

      const data: UpdateTodoDTO = {
        task: 'task-1',
        isDone: 1,
      };

      jest.spyOn(todoRepository, 'save').mockRejectedValueOnce(new Error());

      //Assert
      expect(todoService.update('1', data)).rejects.toThrowError();
    });
  });

  describe('deleteById', () => {
    it('should delete a todo entity item successfully', async () => {
      //Act
      const result = await todoService.deleteById('1');

      //Assert
      expect(result).toBeUndefined();
      expect(todoRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(todoRepository.softDelete).toHaveBeenCalledTimes(1);
    });
    it('should throw a not found exception', async () => {
      //Arrange
      jest
        .spyOn(todoRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      //Assert
      expect(todoService.deleteById('1')).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should a throw a exception', () => {
      jest
        .spyOn(todoRepository, 'softDelete')
        .mockRejectedValueOnce(new Error());

      expect(todoService.deleteById('1')).rejects.toThrowError();
    });
  });
});
