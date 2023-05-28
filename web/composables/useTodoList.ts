import { TodoDto } from "~/types/todo";

export const useTodoList = async () => {
  const { data, refresh, ...fetchResult } = await useLazyFetch<{
    count: number;
    items: TodoDto[];
  }>(endpoint("/todos"));

  const addTodo = async (title: string) => {
    await $fetch(endpoint("/todos"), {
      method: "POST",
      body: {
        title,
      },
    });
    await refresh();
  };

  const callChangeIsFinished = async (id: string, isFinished: boolean) => {
    await $fetch(endpoint("/todos/is_finished"), {
      method: "PUT",
      params: {
        id,
        isFinished,
      },
    });
    await refresh();
  };

  const openTodo = (id: string) => callChangeIsFinished(id, false);
  const finishTodo = (id: string) => callChangeIsFinished(id, true);

  return {
    todoList: computed(() => data.value?.items ?? []),
    count: computed(() => data.value?.count ?? 0),
    ...fetchResult,
    addTodo,
    openTodo,
    finishTodo,
  };
};
