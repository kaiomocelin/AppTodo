<template>
  <div id="app">
    <h1>Tarefas</h1>
    <TasksProgress :progress="progress" />
    <NewTask @taskAdded="addTask($event)" />
    <TaskGrid
      :tasks="tasks"
      @taskDeleted="deleteTask"
      @taskStateChanged="toggleTaskState"
    />
  </div>
</template>

<script>
import TaskGrid from "./components/TaskGrid";
import NewTask from "./components/NewTask";
import TasksProgress from "./components/TasksProgress";

export default {
  components: {
    TaskGrid,
    NewTask,
    TasksProgress,
  },

  data() {
    return {
      tasks: [],
    };
  },

  computed: {
    progress() {
      const total = this.tasks.length;
      const done = this.tasks.filter((t) => !t.pending).length;
      return Math.round((done / total) * 100) || 0;
    },
  },

  watch: {
    tasks: {
      deep: true,
      handler() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      },
    },
  },

  mounted() {
    const json = localStorage.getItem("tasks");
    this.tasks = JSON.parse(json) || [];
  },

  methods: {
    addTask(task) {
      const sameName = (t) => t.title === task.title;
      const reallyNew = this.tasks.filter(sameName).length == 0;
      if (reallyNew && task.title) {
        this.tasks = [
          ...this.tasks,
          {
            title: task.title,
            pending: task.pending || true,
          },
        ];
      }
    },
    deleteTask(id) {
      this.tasks.splice(id, 1);
    },
    toggleTaskState(id) {
      this.tasks[id].pending = !this.tasks[id].pending;
    },
  },
};
</script>

<style>
body {
  font-family: "Lato", sans-serif;
  background: url("https://www.xmple.com/wallpaper/turquoise-linear-gradient-azure-2560x1440-c2-3a6071-59e5a6-a-0-f-14.svg");
  color: #fff;
}

#app {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#app h1 {
  text-align: center;
  color: #ffffff;
  font-family: "Raleway", sans-serif;
  font-size: 62px;
  font-weight: 80;
  line-height: 72px;
  margin: 0 0 24px;
}
</style>
