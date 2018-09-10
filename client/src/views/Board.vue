<template>
  <div class="board">
    <h1>{{board.title}}</h1>
    <h5>{{board.description}}</h5>
    <div class="row">
      <div class="col-6">
        <button @click="goToBoards">BOARDS</button>
      </div>
      <div class="col-6">
        <button @click="logout">LOGOUT</button>
      </div>
    </div>
    <hr>
    <form @submit.prevent="addList">
      <input class="newList1" type="text" placeholder="New List" v-model="newList.title" required>
      <input class="newList2" type="text" placeholder="Description" v-model="newList.description" required>
      <button class="submit" type="submit">Create New List</button>
    </form>
    <hr>

    <div class="row justify-content-center">
      <List class="col-3" v-for="list in lists" :listData='list' :key="list._id" />
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
      goToBoards() {
        this.$store.dispatch("goToBoards")
      },
      logout() {
        this.$store.dispatch("logout")
        this.$store.state.user._id = ""
        this.$store.state.boards = []
      }

    },
    props: ["boardId"],

    components: {
      List
    },

  };
</script>
<style scoped>
  .newList1 {
    margin-right: 5px
  }
  .newList2 {
    margin-right: 5px
  }
</style>