<template>
    <div class="task">
        <h3>Task View</h3>
        <h4>{{taskData.description}}</h4>
        <form @submit.prevent="addComment">
            <!-- <input type="text" placeholder="title" v-model="newTask.title" required> -->
            <input type="text" placeholder="comment" v-model="newComment.description">
            <button type="submit">Add Comment</button>
            <button @click="deleteTask(taskData._id)">DELETE Task</button>
        </form>
        <div v-for="comment in comments" :key="comment._id">
            {{comment.description}}
            <!-- <router-link :to="{name: 'comment', params: {commentId: comment._id}}">{{comment.description}}</router-link> -->
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
            }
        },
        mounted() {
            this.$store.dispatch('getTasks', this.listId)
        },
        methods: {
            addComment() {
                this.$store.dispatch("addComment", { data: this.newComment, taskId: this.taskId });
                this.newComment = { description: "" };
            },
            deleteComment(commentId) {
                this.$store.dispatch("deleteComment", { commentId, taskId: this.taskId });
            },
            deleteTask(taskId) {
                this.$store.dispatch("deleteTask", taskId);
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