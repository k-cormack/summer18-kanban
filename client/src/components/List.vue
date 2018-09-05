<template>
  <div class="list">
    This is a single List Component!!! {{listData.description}}
    <form @submit.prevent="addTask">
      <!-- <input type="text" placeholder="title" v-model="newTask.title" required> -->
      <input type="text" placeholder="description" v-model="newTask.description">
      <button type="submit">Create New Task</button>
    </form>
    <div v-for="task in tasks" :key="task._id">
      <router-link :to="{name: 'task', params: {taskId: task._id}}">{{task.description}}</router-link>
      <button @click="deleteTask(task._id)">DELETE Task</button>
    </div>
  </div>
</template>

<script>
  import Task from '@/components/Task'

  export default {
    name: "list",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    data() {
      return {
        newTask: {
          description: ""
        }
      };
    },
    mounted() {
      this.$store.dispatch('getTasks', this.listId)
    },

    methods: {
      addTask() {
        this.$store.dispatch("addTask", this.newTask);
        this.newTask = { title: "", description: "" };
      },
      deleteTask(taskId) {
        this.$store.dispatch("deleteTask", taskId);
      }
    },
    props: ["listData"],


    computed: {
      tasks() {
        return this.$store.state.tasks
      }
    },
    components: {
      Task
    }
  };
</script>
<style scoped>
</style>