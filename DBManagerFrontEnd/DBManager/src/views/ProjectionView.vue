<template>
  <div class="database">
    <h1>"{{this.$route.params.table}}" Projection</h1>
    <h2>WHERE {{this.$route.params.field}} {{this.$route.params.operator}} {{this.$route.params.value}}</h2>
    <button class="btn btn-outline-warning form-control" v-on:click="this.$router.push('/' + this.$route.params.database + '/' + this.$route.params.table)">Go Back</button>

    <table class="table">
      <thead>
      <tr>
        <th scope="col" v-for="key in data.uniqueKeys" :key="key">
          {{key}}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in data.data" :key="item.Database">
        <td v-for="(uniqueKey, index) in data.uniqueKeys" scope="row">
          {{item[Object.keys(item)[index]]}}
        </td>

      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProjectionView",
  data() {
    return {
      data: null,

    }
  },
  created() {
    this.fetch()
  },
  methods : {

    createProjection(){

    },
    fetch(){

      axios({
        method: 'post',
        url: 'http://localhost:3000/database/projection',
        headers: {},
        data: {
            database : this.$route.params.database,
            table : this.$route.params.table,
            property : this.$route.params.field,
            operation : this.$route.params.operator,
            target : this.$route.params.value,
        }
      }).then((response => {
        console.log(response.data)
        this.data = response.data
      }));
    }
  }
}
</script>

<style scoped>
.database{
  display: flex;
  flex-direction: column;
}
</style>