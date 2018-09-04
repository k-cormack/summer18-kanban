<template>
  <div class="board">
    This is a single Board View!!!
    {{boardId}}
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <input type="text" placeholder="description" v-model="newList.description">
      <button type="submit">Create New List</button>
    </form>
    <div v-for="list in lists" :key="list._id">
      <router-link :to="{name: 'list', params: {listId: list._id}}">{{list.title}}</router-link>
      <button @click="deleteList(list._id)">DELETE LIST</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "board",
  created() {
    //blocks users not logged in
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }
  },

  computed: {
    lists(){
      return this.$store.state.lists
    }
  },
  props: ["boardId"]
};
</script>