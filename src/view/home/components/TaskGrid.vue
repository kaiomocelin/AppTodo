<template>
  <div class="task-grid">
    <template v-if="tasks.length">
      <Task
        v-for="(task, id) in tasks"
        :key="task.title"
        :task="task"
        @taskDeleted="$emit('taskDeleted', id)"
        @taskStateChanged="$emit('taskStateChanged', id)"
      />
    </template>
    <p v-else class="no-task">Sua vida está em dia :)</p>
  </div>
</template>

<script>
import Task from "./Task";
export default {
  name: "TaskGrid",

  components: {
    Task,
  },

  props: {
    tasks: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
.task-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.task-grid .task {
  margin: 10px;
}

.no-task {
  color: darkslategray;
  font-size: 1rem;
}
</style>
