<template>
  <div class="board justify-content-center">
    <h1>{{board.title}}</h1>
    <h5>{{board.description}}</h5>
    <hr>
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <input type="text" placeholder="description" v-model="newList.description">
      <button type="submit">Create New List</button>
    </form>
    <div v-for="list in lists" :key="list._id">
      <List class="col-6" v-for="list in lists" :listData='list' :key="list._id" />

      <button @click="deleteList(list._id)">Delete List</button>
    </div>
  </div>
</template>

<script>
  import List from '@/components/List';

  export default {
    name: "board",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch('getBoard', this.$route.params.boardId)
      this.$store.dispatch("getLists", this.$route.params.boardId)

    },
    data() {
      return {
        newList: {
          title: "",
          description: "",
          boardId: this.boardId
        }
      };
    },

    computed: {
      lists() {
        return this.$store.state.lists

      },
      board() {
        return this.$store.state.activeBoard
      }
    },
    methods: {
      addList() {

        // this.newList.boardId = this.boardId
        this.$store.dispatch("addList", this.newList);
        this.newList = { title: "", description: "" };
      },
      deleteList(ListId) {
        this.$store.dispatch("deleteList", ListId);
      }
    },

    components: {
      List
    },

    props: ["boardId"]
  };
</script>
<style scoped>
</style>