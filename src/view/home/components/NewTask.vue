<template>
  <div class="new-task">
    <input
      v-model="title"
      type="text"
      @keydown.enter="add()"
      class="form-element"
      placeholder="Nova Tarefa..."
    />
    <button class="form-element" @click="add()">+</button>
  </div>
</template>

<script>
export default {
  name: "NewTask",

  data() {
    return {
      title: "",
    };
  },

  methods: {
    add() {
      this.$emit("taskAdded", { title: this.title });
      this.title = "";
    },
  },
};
</script>

<style scoped>
.new-task {
  margin: 35px;
  display: flex;
  justify-content: center;
}

.form-element {
  align-items: center;
  outline: none;
  font-size: 1.3rem;
  border: 1px solid #fff;
  padding: 5px 10px 8px;
}

input.form-element {
  width: 600px;
  background: #fff2;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

button.form-element {
  border-left: none;
  background-color: #2196f3;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>
