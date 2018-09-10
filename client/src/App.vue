<template>
  <div class="row" id="app">
    <router-view/>
  </div>
</template>

<style>
  #app {
    display: flex;
    justify-content: center;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    background-image: linear-gradient(to top, #ffffff 0%, #087077 100%);
    height: 700px;
    text-shadow: 2px 2px 3px black;
    padding: 0px
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>