<script setup lang="ts">
const props = defineProps<{
  title: string;
  disabled: boolean;
}>();

const emit = defineEmits<{
  (event: "update:title", title: string): void;
  (event: "add", title: string): void;
}>();

const title = computed({
  get: () => props.title,
  set: (value) => emit("update:title", value),
});

const onSubmit = () => {
  emit("add", title.value);
};
const canSubmit = computed(() => !props.disabled && title.value.length > 0);
</script>

<template>
  <form @submit.prevent="onSubmit">
    <label>
      <div>ToDoタイトル</div>
      <input v-bind="$attrs" v-model="title" placeholder="牛乳を１パック買う" />
    </label>
    <button :disabled="!canSubmit">Add</button>
  </form>
</template>
