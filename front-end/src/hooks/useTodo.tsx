import { useCallback, useState } from "react";
import { TodoService } from "services";
import { ITodo } from "types";

export const useTodo = () => {
  const [tasks, seTasks] = useState<ITodo[]>([]);

  const getAll = useCallback(async () => {
    const { status, data } = await TodoService.getAll();

    if (status !== 200) throw new Error();

    seTasks(data);
  }, []);

  return {
    tasks,
    getAll,
  };
};
