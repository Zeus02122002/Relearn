<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-600 to-yellow-500 flex items-center justify-center p-4">
    <div class="bg-black rounded-lg shadow-lg p-6 w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-4 text-white">
        My Todo List
      </h1>
      <div class="flex mb-4">
        <input
          v-model="searchQuery"
          class="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search tasks..." />
      </div>

      <form @submit.prevent="addTodo" class="flex mb-4">
        <input
          v-model="newTodo"
          class="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new task" />
        <button
          type="submit"
          class="ml-2 bg-blue-500 text-white px-4 rounded hover:bg-blue-600">
          Add
        </button>
      </form>

      <ul>
        <li
          v-for="(todo, index) in filteredTodos"
          :key="index"
          class="flex bg-white justify-between items-center mb-2 p-2 border rounded">
          
          <div v-if="todo.editing" class="flex-1 flex items-center gap-2">
            <input
              v-model="todo.text"
              class="flex-1 border rounded px-2 py-1"
              autofocus />
            <button
              @click="finishEdit(index)"
              class="text-green-600 hover:underline">
              ✅
            </button>
            <button
              @click="cancelEdit(index)"
              class="text-red-500 hover:underline">
              ❌
            </button>
          </div>

          <div v-else class="flex items-center flex-1 gap-2">
            <input type="checkbox" v-model="todo.completed" class="w-4 h-4" />
            <span :class="todo.completed ? 'line-through text-gray-500' : ''">
              {{ todo.text }}
            </span>
          </div>
          <div v-if="!todo.editing" class="ml-2 flex gap-2">
            <button
              @click="enableEdit(index)"
              class="text-blue-500 hover:underline">
              Edit
            </button>
            <button
              @click="removeTodo(index)"
              class="text-red-500 hover:underline">
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref, watch } from "vue";

interface Todo {
  text: string;
  completed: boolean;
  editing: boolean;
}

const newTodo = ref<string>("");
const searchQuery = ref<string>("");

const stored = localStorage.getItem("todos");
const todos = ref<Todo[]>(stored ? JSON.parse(stored) : []);

const filteredTodos = computed(() => {
  if (!searchQuery.value.trim()) {
    return todos.value;
  }
  return todos.value.filter((todo) =>
    todo.text.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const addTodo = (): void => {
  if (newTodo.value.trim() === "") return;
  todos.value.push({ text: newTodo.value, completed: false, editing: false });
  newTodo.value = "";
};

const removeTodo = (index: number): void => {
  todos.value.splice(index, 1);
};

const enableEdit = (index: number): void => {
  todos.value[index].editing = true;
};

const finishEdit = (index: number): void => {
  todos.value[index].editing = false;
};

const cancelEdit = (index: number): void => {
  todos.value[index].editing = false;
};

const toggleComplete = (index: number): void => {
  todos.value[index].completed = !todos.value[index].completed;
};

watch(
  todos,
  (newVal) => {
    localStorage.setItem("todos", JSON.stringify(newVal));
  },
  { deep: true }
);

export default {
  setup() {
    return {
      newTodo,
      searchQuery,
      todos,
      filteredTodos,
      addTodo,
      removeTodo,
      enableEdit,
      finishEdit,
      cancelEdit,
      toggleComplete,
    };
  },
};
</script>
