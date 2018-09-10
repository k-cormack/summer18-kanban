import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:3000/api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {},
    // comments: {},
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setBoard(state, board) {
      state.activeBoard = board
      //Vue.set(state.activeBoard, activeBoard[0].boardId, activeBoard)
    },
    setLists(state, lists) {
      state.lists = lists
    },
    setTasks(state, data) {
      // state.tasks = data
      Vue.set(state.tasks, data.listId, data.tasks)
    },
    // setComments(state, comments) {
    //   state.comments = comments
    // },
  },
  actions: {
    //AUTH STUFF
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    logout({commit, dispatch}) {
      auth.delete('logout')
      .then(res => {
        debugger
        commit('setUser', null)
        
      })
    },

    //BOARDS
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    getBoard({ commit, dispatch }, boardId) {
      api.get('boards/' + boardId)
        .then(res => {
          commit('setBoard', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },

    //LIST Stuff
    getLists({ commit, dispatch }, boardId) {
      api.get('boards/'+boardId+'/lists')
        .then(res => {
          commit('setLists', res.data)
        })
    },

    addList({ commit, dispatch }, listData) {
      
      api.post('/lists', listData)
        .then(res => {
          dispatch('getLists', listData.boardId)
        })
    },

    deleteList({ commit, dispatch }, listData) {
      api.delete('lists/' + listData._id)
        .then(res => {
          dispatch('getLists', listData.boardId)
        })
    },

    //TASK Stuff

    getTasks({ commit, dispatch }, listId) {
      
      api.get('/lists/'+listId+'/tasks')
        .then(res => {
          
          commit('setTasks', {listId, tasks: res.data})
        })
    },

    addTask({ commit, dispatch }, taskData) {
      
      api.post('/tasks', taskData)
      .then(res => {
      dispatch('getTasks', taskData.listId)
        })
    },

    deleteTask({ commit, dispatch }, task) {
      api.delete('tasks/' + task._id)
        .then(res => {
          dispatch('getTasks', task.listId)
        })
    },
    updateTask({commit, dispatch}, task) {
      api.put('tasks/' + task._id, task)
      .then(res => {
        dispatch('getTasks', task.listId)
        dispatch('getTasks', task.oldListId)
      })
    },

    //COMMENT Stuff

    getComments({ commit, dispatch }, payload) {
      api.get('tasks/' + payload + '/comments/')
        .then(res => {
          
          commit('setComments', res.data)
          
        })
    },

    addComment({ commit, dispatch }, payload) {
      api.post('tasks/' + payload.data.taskId + '/comments', payload.data)
        .then(res => {
          dispatch('getTasks', payload.listId)
          
        })
    },

    deleteComment({ commit, dispatch }, payload) {
      api.delete('tasks/' + payload.taskId + '/comments/' + payload.commentId)
        .then(res => {
          dispatch('getTasks', payload.listId)
        })
    },


  }
})