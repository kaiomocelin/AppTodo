<template>
  <div
    class="task"
    :class="stateClass"
    @click="$emit('taskStateChanged', task)"
  >
    <span @click.stop="$emit('taskDeleted', task)" class="close">x</span>
    <p>{{ task.title }}</p>
  </div>
</template>

<script>
export default {
  name: "Task",

  props: {
    task: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    stateClass() {
      return {
        pending: this.task.title,
        done: !this.task.pending,
      };
    },
  },
};
</script>

<style scoped>
.task {
  position: relative;
  box-sizing: border-box;
  width: 250px;
  height: 100px;
  padding: 10px;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: 300;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
}

.task:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px 0 rgba(33, 33, 33, 0.2);
}

.pending {
  border-left: 12px solid #b73229;
  background-color: #f44336;
}

.done {
  color: #ddd;
  border-left: 12px solid #0a8f08;
  background-color: #4caf50;
  text-decoration: line-through;
}

.pending .close {
  background-color: #b73229;
}

.done .close {
  background-color: #0a8f08;
}

.close {
  color: white;
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
}
</style>
