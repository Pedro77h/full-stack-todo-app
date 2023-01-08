import { ITodo } from 'types';
import { Api } from "providers"

const getAll = () => Api.get<ITodo[]>('/v1/todos')

export const TodoService = {
  getAll,
}