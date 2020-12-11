<template>
  <div>
    <div class="container">
      <h1>Tarefas</h1>
      <div>
        <input
          type="text"
          v-model="value"
          @keypress.enter="add()"
          placeholder="Tarefa..."
        />
        <button @click="add()">Adicionar</button>
      </div>
      <hr />
    </div>
    <div class="linha">
      <div class="coluna-50">
        <ul v-for="(item, key) in todos" :key="key">
          <li v-show="!item.completed">
            <input
              type="checkbox"
              :value="key"
              @change="completed(key, item)"
            />
            {{ item.title }}
            <b-button @click="remove(key)">X</b-button>
            <b-button @click="$bvModal.show('edit-modal-' + key)"
              >Edit</b-button
            >
          </li>
          <b-modal
            :id="'edit-modal-' + key"
            title="Editar tarefa"
            centered
            @ok="edit(key)"
          >
            <input type="text" v-model="newValue" />
          </b-modal>
        </ul>
      </div>

      <div class="coluna-50">
        <ul v-for="(item, key) in todos" :key="key">
          <li v-show="item.completed">
            {{ item.title }}
            <b-button @click="remove(key)">X</b-button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      value: "",
      newValue: "",
    };
  },

  mounted() {
    if (localStorage.getItem("todos")) {
      try {
        this.todos = JSON.parse(localStorage.getItem("todos"));
      } catch (e) {
        localStorage.removeItem("todos");
      }
    }
  },

  methods: {
    add() {
      if (this.todos.find((x) => x.title === this.value) || this.value === "") {
        this.value = "";
        return false;
      }
      this.todos = [...this.todos, { title: this.value }];
      this.value = "";
      this.saveTodos();
    },
    remove(index) {
      this.todos.splice(index, 1);
      this.saveTodos();
    },
    edit(key) {
      if (this.todos.find((x) => x.title === this.newValue)) {
        this.newValue = "";
        return false;
      }
      const newValue = { title: this.newValue };
      this.todos.splice(key, 1, newValue);
      this.newValue = "";
      this.saveTodos();
    },
    completed(key, item) {
      this.todos = this.todos.map((x) =>
        x !== item ? x : { ...x, completed: true }
      );
      this.saveTodos();
    },
    saveTodos() {
      const parsed = JSON.stringify(this.todos);
      localStorage.setItem("todos", parsed);
    },
  },
};
</script>

<style>
.linha {
  display: flex;
  flex-flow: row wrap;
}
.coluna-50 {
  width: 50%;
  border: lawngreen;
}
ul {
  list-style-type: none;
}
.container {
  text-align: center;
  font-family: "Courier New", Courier, monospace;
}
</style>
