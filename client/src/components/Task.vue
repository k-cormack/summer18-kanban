<template>
    <div class="task">
        <h4>{{taskData.description}}</h4>
        <form @submit.prevent="addComment">
            <button @click="deleteTask()">Delete Task</button>
            <input type="text" placeholder="comment" v-model="newComment.description">
            <button type="submit">Add Comment</button>
        </form>
        <div class="col-3" v-for="comment in comments" :key="comment._id">
            {{comment.description}}
            <button @click="deleteComment(comment._id)">Delete Comment</button>
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
            }
        },
        mounted() {
            this.$store.dispatch('getTasks', this.listId);
            this.$store.dispatch('getComments', {taskId: this.taskData._id})
        },
        methods: {
            addComment() {
                this.$store.dispatch("addComment", { data: this.newComment, taskId: this.taskData._id });
                this.newComment = { description: "" };
            },
            deleteComment(commentId) {
                this.$store.dispatch("deleteComment", { taskId: this.taskData._id, commentId });
            },
            deleteTask() {
                this.$store.dispatch("deleteTask", this.taskData);
            }

        },


        computed: {
            comments() {
                return this.$store.state.comments
            }
        },
        props: ["taskData", "taskDescription"]
    };
</script>
<style scoped>
</style>