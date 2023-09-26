<template>
  <div class="main">
    <h1>Create New Database</h1>
    <button v-on:click="this.$router.push('/')" class="btn btn-outline-warning" >Go Back</button>

    <form @submit.prevent="createDatabase(databaseName)" class="needs-validation">
      <div class="form-group form-check">
        <label for="exampleInputEmail1">Database Name</label>
        <input v-model="databaseName" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="" required>
        <small id="emailHelp" class="form-text text-muted">Submit database name</small>
      </div>
      <button type="submit" class="btn btn-outline-success">Create</button>
    </form>

  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "createDatabaseView",
  data() {
    return {
      databaseName : "",
      alertText : ""
    }
  },
  methods : {
    createDatabase(databaseName){
        axios({
          method: 'post',
          url: 'http://localhost:3000/database/create',
          headers: {},
          data: {
            name: databaseName, // This is the body part
          }
        });
        window.location.href = "/"

    }
  }
}
</script>

<style scoped>
  .main {
    display: flex;
    flex-direction: column;
  }
</style>