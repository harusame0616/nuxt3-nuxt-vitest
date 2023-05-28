<script setup lang="ts">
import { TodoDto } from "~/types/todo";

const props = defineProps<{ todo: TodoDto }>();
const emits = defineEmits<{
  (event: "update:isFinished", isFinished: boolean): void;
}>();

const isFinished = computed({
  get: () => !!props.todo.finishedAt,
  set: (isFinished) => {
    emits("update:isFinished", isFinished);
  },
});
</script>

<template>
  <section>
    <label>
      <input type="checkbox" v-model="isFinished" />
      {{ props.todo.title }}
    </label>
  </section>
</template>
