<template>
  <div class="list">
    <hr>
    <h2>
      Lists
    </h2>
    <h3>{{listData.title}}</h3>
    <h5>{{listData.description}}</h5>


    <form @submit.prevent="addTask">
      <input type="text" placeholder="description" v-model="newTask.description">
      <button type="submit">Create New Task</button>
      <button @click="deleteTask(taskData._id)">Delete Task</button>
    </form>
    <task class="col-3" v-for="task in tasks" :taskData='task' :key="task._id" />
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
          title: "",
          description: "",
          listId: this.listData._id
        }
      };
    },
    mounted() {
      this.$store.dispatch('getTasks', this.listData._id)
    },

    methods: {
      addTask() {
        this.$store.dispatch("addTask", this.newTask);
        this.newTask = { title: "", description: "", listId: this.listData._id };
      },

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