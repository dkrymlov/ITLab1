<template>

  <div class="tables">
    <h1>"{{this.$route.params.database}}" Tables</h1>
    <div class="buttons">
      <button class="btn btn-outline-warning" v-on:click="this.$router.push('/')">Go Back</button>
      <button class="btn btn-outline-success" v-on:click="this.$router.push(this.$route.params.database + '/create')">Create</button>
    </div>
<!--    <a href="/create">Create new</a>-->
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in data" :key="item.Database">
        <td scope="row">{{ item.table_name }}</td>
        <td>
          <button class="btn btn-outline-info" v-on:click="this.$router.push('/'+ item.databaseName + '/' + item.table_name)">Open</button>
<!--          <a v-bind:href="'/'+ item.databaseName + '/' + item.table_name">Open</a>-->
        </td>
        <td>
          <button class="btn btn-outline-danger" v-on:click="remove(item.databaseName, item.table_name)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

<!--  <ul id="example-1">-->
<!--    <li v-for="item in data" :key="item.Database">-->
<!--      {{ item.table_name }}-->
<!--      <a v-bind:href="'/'+ item.databaseName + '/' + item.table_name">Open</a>-->
<!--      <span v-on:click="remove(item.databaseName, item.table_name)">Delete</span>-->
<!--    </li>-->
<!--  </ul>-->
</template>

<script>
import axios from "axios";

export default {
  name: "TablesView",

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
      axios.get('api/database/' + this.$route.params.database).then(response => {
        console.log(response.data)
        this.data = response.data
      })
    },
    remove(database, table){
      axios({
        method: 'post',
        url: 'http://localhost:3000/database/table/drop',
        headers: {},
        data: {
          database: database, // This is the body part
          table: table, // This is the body part
        }
      });
      window.location.reload()
    }
  }
}
</script>

<style scoped>
.tables{
  display: flex;
  flex-direction: column;
}

.buttons {
  display: flex;
  justify-content: space-around;
}

.buttons .btn{
  width: 40%;
}

</style>