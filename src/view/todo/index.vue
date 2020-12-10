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
          @ok="save()"
        >
          <input type="text" :value="item.title" />
        </b-modal>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "",
          conclude: false,
        },
      ],
      value: "",
    };
  },

  methods: {
    save() {
      this.items.push({
        title: this.value,
      });
      this.value = "";
    },
    remove(index) {
      this.items.splice(index, 1);
    },
    edit() {
      this.$bvModal.show("edit-modal");
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
