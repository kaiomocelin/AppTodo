<template>
  <div>
    <div class="container">
      <h1>Tarefas</h1>
      <div>
        <input
          type="text"
          v-model="value"
          @keypress.enter="save()"
          placeholder="Tarefa..."
        />
        <button @click="save()">Adicionar</button>
      </div>
      <hr />
    </div>
    <div>
      <ul v-for="(item, key) in items" :key="key">
        <li v-if="!item.conclude">
          {{ item.title }}
          <b-button @click="remove(key)">X</b-button>
          <b-button @click="$bvModal.show('edit-modal-' + key)">Edit</b-button>
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
</template>

<script>
export default {
  data() {
    return {
      items: [],
      value: "",
      newValue: "",
    };
  },

  methods: {
    save() {
      if (this.items.find((x) => x.title === this.value) || this.value === "") {
        this.value = "";
        return false;
      }
      this.items.push({
        title: this.value,
      });
      this.value = "";
    },
    remove(index) {
      this.items.splice(index, 1);
    },
    edit(key) {
      if (this.items.find((x) => x.title === this.newValue)) {
        this.newValue = "";
        return false;
      }
      const newValue = { title: this.newValue };
      this.items.splice(key, 1, newValue);
      this.newValue = "";
    },
  },
};
</script>

<style>
ul {
  list-style-type: none;
}
.container {
  text-align: center;
  font-family: "Courier New", Courier, monospace;
}
</style>
