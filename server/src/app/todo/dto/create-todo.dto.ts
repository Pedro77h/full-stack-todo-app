import { IsNotEmpty } from 'class-validator';

export class CreateTodoDTO {
  @IsNotEmpty()
  task: string;

  @IsNotEmpty()
  isDone: string;
}
