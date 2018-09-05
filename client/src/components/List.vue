<template>
  <div class="list">

    This is a single List Component!!!
    <hr> Title:{{listData.title}} Description:{{listData.description}}
    <form @submit.prevent="addTask">
      <!-- <input type="text" placeholder="title" v-model="newTask.title" required> -->
      <input type="text" placeholder="description" v-model="newTask.description">
      <button type="submit">Create New Task</button>
    </form>
    <task v-for="task in tasks" :taskData='task' :key="task._id" />

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