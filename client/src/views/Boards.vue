<template>
  <div class="boards flex col-12">

    <div class="row justify-content-end" id="logout">
      <button @click="logout">LOGOUT</button>
    </div>

    <h2>
      BOARDS
    </h2>
    <form @submit.prevent="addBoard">
      <input type="text" placeholder="Name of Board" v-model="newBoard.title" required>
      <input type="text" placeholder="Description" v-model="newBoard.description">
      <button type="submit">Create Board</button>
    </form>
    <div class="row justify-content-center" v-for="board in boards" :key="board._id">
      <div class="col-3">
        <router-link class="row justify-content-center" :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
      </div>
      <div class="col-3">
        <div class="row">
          <button @click="deleteBoard(board._id)">Delete Board</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "boards",
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      },
      logout() {
        this.$store.dispatch("logout")
        this.$store.state.user._id = ""
        this.$store.state.boards = []
      }
    },

  };
</script>
<style scoped>
  .boards {
    font-size: 1.75rem;
  }

  #logout {
    margin-right: 40px;
  }
</style>