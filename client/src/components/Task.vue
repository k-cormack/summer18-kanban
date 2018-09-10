<template>
    <div class="task card">
        <div class="card-body task-body">
            <h4>{{taskData.description}}</h4>
            <button @click="deleteTask()">Delete Task</button>
            <form @submit.prevent="addComment">
                <input type="text" placeholder="comment" v-model="newComment.description" required>
                <button type="submit">Add Comment</button>
            </form>
        </div>
        <div class="comment card" v-for="comment in taskData.comments" :key="comment._id">
            <div class="card-body comment-body">
                <p>{{comment.description}}</p>
                <button @click="deleteComment(comment._id)">Delete Comment</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "task",
        data() {
            return {
                newComment: {
                    description: "",
                    taskId: this.taskData._id
                }
            }
        },
        created() {
            //blocks users not logged in
            if (!this.$store.state.user._id) {
                this.$router.push({ name: "login" });
            }
        },
  
        methods: {
            addComment() {
                this.$store.dispatch("addComment", { data: this.newComment, listId: this.taskData.listId });
                this.newComment = { description: "", taskId: this.taskData._id };
            },
            deleteComment(commentId) {
                this.$store.dispatch("deleteComment", { commentId, taskId: this.taskData._id, listId: this.taskData.listId });
            },
            deleteTask() {
                this.$store.dispatch("deleteTask", this.taskData);
            }
        },
        // computed: {
        //     comments() {
        //         return this.$store.state.comments
        //     }
        // },
        props: ["taskData", "taskDescription"]
    };
</script>
<style scoped>
    .task-body {
        background-color: #c4e3cb;
    }
    .comment-body {
        background-color: #c4e3cb8e;
        
    }
</style>