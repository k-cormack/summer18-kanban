<template>
  <div class="list">
    <hr>
    <!-- <h2>
      Lists
    </h2> -->
    <h3>{{listData.title}}</h3>
    <!-- <h5>{{listData.description}}</h5> -->
    <button @click="deleteList(listData)">Delete List</button>

    <form @submit.prevent="addTask">
      <input type="text" placeholder="description" v-model="newTask.description" required>
      <button type="submit">Create New Task</button>
    </form>

    <Drag class="drag" :transferData="{ example: 'nested', position: 'list'}">
      <Drag class="drag" v-for="task in tasks" @dragstart="handleTaskDragstart" :transferData="task">
        <Task class="col-3"  :taskData='task' :key="task._id"/>
      </Drag>
    </Drag>
    <Drop class="drop"
			:class="{ over }"
			@dragover="over = true"
			@dragleave="over = false"
			@drop="handleDrop">
				drop here
		</Drop>

  </div>
</template>

<script>
  import Task from '@/components/Task';
  import { Drag, Drop } from 'vue-drag-drop';

  export default {
    name: "list",
    data: function() {
      return {
        over: false,
        newTask: {
          description: "",
          listId: this.listData._id
        },
      };
    },
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    computed: {
      tasks() {
        return this.$store.state.tasks[this.listData._id]
      }
    },
    mounted() {
      this.$store.dispatch('getTasks', this.listData._id)
    },

    methods: {
      addTask() {
        this.$store.dispatch("addTask", this.newTask);
        this.newTask = { title: "", description: "", listId: this.listData._id };
      },
      deleteList(listData) {
        this.$store.dispatch("deleteList", listData);
      },
      handleTaskDragstart(data, event) {
				event.stopPropagation();
			},
			handleDrop(task) {
        task.oldListId = task.listId
        task.listId = this.listData._id
        this.over = false;
        this.$store.dispatch("updateTask", task)
				// alert(`You dropped with task: ${JSON.stringify(task)}`);
			},
		},

    props: ["listData"],


    components: {
      Task,
      Drag,
      Drop
    }
  };
</script>
<style scoped>
  
</style>