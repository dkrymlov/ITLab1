<template>
  <div class="databases">
    <h1>Databases</h1>
    <button class="btn btn-outline-success" v-on:click="this.$router.push('/create')" >Create</button>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in data" :key="item.Database">
        <td scope="row">{{item.Database}}</td>
        <td>
          <button class="btn btn-outline-info" v-on:click="this.$router.push('/'+ item.Database)">Open</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

<!--  <ul id="example-1">-->
<!--    <li v-for="item in data" :key="item.Database">-->
<!--      {{ item.Database }}-->
<!--      <a v-bind:href="'/'+ item.Database">Open</a>-->
<!--    </li>-->
<!--  </ul>-->
</template>

<script>
import axios from "axios";

export default {
  name: "DatabasesView",

  data() {
    return {
      data: null,
    }
  },
  created() {
    this.fetch()
  },
  methods : {
    fetch(){
      axios.get('http://localhost:3000/database').then(response => {
        this.data = response.data
        console.log(response)
      })
    }
  }

}
</script>

<style scoped>
  .databases{
    display: flex;
    flex-direction: column;
  }
</style>