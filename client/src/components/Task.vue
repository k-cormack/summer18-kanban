<template>
    <div class="task card">
        <div class="card-body task-body">
            <h4>{{taskData.description}}</h4>
            <button @click="deleteTask()">Delete Task</button>
            <hr>
            <form @submit.prevent="addComment">
                <input type="text" placeholder="comment" v-model="newComment.description" required>
                <button class="addComment" type="submit">Add Comment</button>
            </form>
        </div>
        <div class="comment" v-for="comment in taskData.comments" :key="comment._id">
            <div class="comment-body">
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
        padding-bottom: 5px        
    }
    .addComment {
        margin-top: 5px
    }
</style>