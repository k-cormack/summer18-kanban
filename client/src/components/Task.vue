<template>
  <div class="task">
    This is a single Task View!!!
    {{taskId}}
    {{taskDescription}}
    <form @submit.prevent="addComment">
      <!-- <input type="text" placeholder="title" v-model="newTask.title" required> -->
      <input type="text" placeholder="description" v-model="newComment.description">
      <button type="submit">Add Comment</button>
    </form>
    <div v-for="comment in comments" :key="comment._id">
      <router-link :to="{name: 'comment', params: {commentId: comment._id}}">{{comment.description}}</router-link>
      <button @click="deleteComment(comment._id)">DELETE Comment</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "task",
  created() {
    //blocks users not logged in
    if (!this.$store.state.user._id) {
      this.$router.push({ name: "login" });
    }
  },
    data() {
    return {
        newComment: {
        description: ""
      }
    };
  },
  addComment() {
      this.$store.dispatch("addComment", this.newComment);
      this.newComment = { title: "", description: "" };
    },
    deleteComment(commentId) {
      this.$store.dispatch("deleteComment", commentId);
    },
  

  computed: {
    comments(){
      return this.$store.state.comments
    }
  },
  props: ["taskId", "taskDescription"]
};
</script>