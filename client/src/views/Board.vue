<template>
  <div class="board">
    <h1>{{board.title}}</h1>
    <h5>{{board.description}}</h5>
    <button @click="logout">LOGOUT</button>
    <hr>
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <input type="text" placeholder="description" v-model="newList.description" required>
      <button type="submit">Create New List</button>
    </form>
    <div>
      <List class="col-6" v-for="list in lists" :listData='list' :key="list._id" />
      <!-- <button @click="deleteList(list._id)">Delete List</button> -->
    </div>
  </div>
</template>

<script>
  import List from '@/components/List';

  export default {
    name: "board",
    data() {
      return {
        newList: {
          title: "",
          description: "",
          boardId: this.boardId
        }
      };
    },
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    computed: {
      board() {
        return this.$store.state.activeBoard
      },
      lists() {
        return this.$store.state.lists
      },
    },
    mounted() {
      this.$store.dispatch('getBoard', this.boardId)
      this.$store.dispatch("getLists", this.boardId)

    },

    methods: {
      addList() {

        // this.newList.boardId = this.boardId
        this.$store.dispatch("addList", this.newList);

        this.newList = { title: "", description: "", boardId: this.boardId };
      },
      logout() {
        this.$store.dispatch("logout")
      }

    },
    props: ["boardId"],

    components: {
      List
    },

  };
</script>
<style scoped>
</style>