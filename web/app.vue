<script setup lang="ts">
const { todoList, addTodo, finishTodo, openTodo, pending } =
  await useTodoList();

const newTitle = ref("");
const onAddTodo = async () => {
  await addTodo(newTitle.value);
  newTitle.value = "";
};

const onUpdateIsFinished = async (todoId: string, isFinished: boolean) => {
  if (isFinished) {
    await finishTodo(todoId);
  } else {
    await openTodo(todoId);
  }
};
</script>

<template>
  <h1>Todo List</h1>
  <TodoAddForm v-model:title="newTitle" @add="onAddTodo" :disabled="pending" />
  <ul v-if="todoList.length">
    <li v-for="todo in todoList">
      <Todo
        :todo="todo"
        @update:is-finished="
          (isFinished: boolean) => onUpdateIsFinished(todo.id, isFinished)
        "
      />
    </li>
  </ul>
</template>
