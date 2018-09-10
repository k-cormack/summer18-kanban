<template>
  <div class="row" id="app">
    <router-view/>
  </div>
</template>

<style>
  #app {
    display: flex;
    justify-content: center;
    font-family: 'Concert One', cursive;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
    background-image: linear-gradient(to top, #ffffff 0%, #96dce6 100%);
    height: 700px;
    text-shadow: 2px 2px 3px black;
    padding: 0px
  }
</style>


<!-- 
lightseafoam: #f4f9f4
mint: #c4e3cb
lightgreen: #8aae92
charcoal: #616161 
-->