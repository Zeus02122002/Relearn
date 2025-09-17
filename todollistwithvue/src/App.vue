  <template>
    <div
      class="min-h-screen bg-gradient-to-br from-blue-600 to-yellow-500 flex items-center justify-center p-4">
      <div class="bg-black rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 class="text-2xl font-bold text-center mb-4 text-white">
          My Todo List
        </h1>

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
            v-for="(todo, index) in todos"
            :key="index"
            class="flex bg-white justify-between items-center mb-2 p-2 border rounded">
            <div v-if="todo.editing" class="flex-1">
              <input
                v-model="todo.text"
                @keyup.enter="todo.editing = false"
                @blur="todo.editing = false"
                class="w-full border rounded px-2 py-1"
                autofocus />
            </div>
            <div
              v-else
              @click="toggleComplete(index)"
              :class="
                todo.completed
                  ? 'line-through text-gray-400 flex-1 cursor-pointer'
                  : 'flex-1 cursor-pointer'
              ">
              {{ todo.text }}
            </div>
            <div class="ml-2 flex gap-2">
              <button
                v-if="!todo.editing"
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

  <script setup>
  import { ref, watch } from "vue";

  const newTodo = ref("");
  const stored = localStorage.getItem("todos");
  const todos = ref(stored ? JSON.parse(stored) : []);

  function addTodo() {
    const text = newTodo.value.trim();
    if (text) {
      todos.value.push({ text, completed: false, editing: false });
      newTodo.value = "";
    }
  }

  function removeTodo(index) {
    todos.value.splice(index, 1);
  }

  function enableEdit(index) {
    todos.value[index].editing = true;
  }

  function toggleComplete(index) {
    todos.value[index].completed = !todos.value[index].completed;
  }

  // persist in localStorage
  watch(
    todos,
    (newVal) => {
      localStorage.setItem("todos", JSON.stringify(newVal));
    },
    { deep: true }
  );
  </script>
