<template>
  <div >
    <div class="container" >
      <h1>Tarefas</h1>
      <div>
        <input
       class="adcInput"
          type="text"
          v-model="value"
          @keypress.enter="add()"
          placeholder="Tarefa..."
        />
        <b-button @click="add()" class="btnAdc">Adicionar</b-button>
      </div>
      <hr />
    </div>
    <div class="linha">
      <div class="colunaA">
        <ul v-for="(item, key) in todos" :key="key">
          <li>
            <span  @click="selected.includes(key) ? selected.splice(selected.indexOf(key), 1) : selected.push(key)" :class="{completed: selected.includes(key)}">{{item.title}}</span>
            <b-button class="btnRemove" @click="remove(key)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
              </svg>
            </b-button>
            <b-button class="btnEdit" @click="$bvModal.show('edit-modal-' + key)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
            </b-button>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    bgImage: "@/assets/background.png",
    selected: [],
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
    saveTodos() {
      const parsed = JSON.stringify(this.todos);
      localStorage.setItem("todos", parsed);
    },
  },
};
</script>

<style>
body {
  background: url("https://www.xmple.com/wallpaper/turquoise-linear-gradient-azure-2560x1440-c2-3a6071-59e5a6-a-0-f-14.svg")
}

h1 {
  color: #ffffff;
  font-family: 'Raleway', sans-serif;
  font-size: 62px;
  font-weight: 80;
  line-height: 72px;
  margin: 0 0 24px;
}

.linha {
  display: flex;
  flex-flow: row wrap;
  padding: 1rem;
   margin:0 10em;
 
}
.colunaA {
  margin-left: 36px;
  width:100%;
  border-width: 1px;
  border-style: solid;
  border-radius: 10px;
  height: 600px;
}
.adcInput {
  outline: none;
  border-radius: 5px;
  border: none;
  width: 300px;
  height: 33px;
}
.adcInput:hover {
  transform: scale(1.01);
  box-shadow: 0 0 11px rgba(33,33,33,.1)
}

.btnAdc {
  margin-left: 10px;
}
.btnAdc:hover {
  box-shadow: 0 4 12px rgba(10, 20, 30, .3)
}

.btnEdit {
  float: right;
  padding: 5px;
  margin-right: 4px;
}

.btnRemove {
  background: red;
  padding: 5px;
  float: right;
  margin-right: 12px;
}


.completed {
  font-weight: normal;
  text-decoration: line-through;
}
ul {
  margin-top: 20px;
  list-style-type: none;
}
li {
  
  margin-left: -10px;
}
span {
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
}
.container {
  margin-top: 2rem;
  text-align: center;
  font-family: "Courier New", Courier, monospace;
  display: block;
}
</style>
