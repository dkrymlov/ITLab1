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

    <div v-if="err" class="alert alert-danger" role="alert">
      {{err}}
    </div>

    <div v-if="ok" class="alert alert-success" role="alert">
      {{ok}}
    </div>

  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "createDatabaseView",
  data() {
    return {
      databaseName : "",
      alertText : "",
      err : null,
      ok : null
    }
  },
  methods : {
    createDatabase(databaseName){
        this.err = null
        this.ok = null
        axios({
          method: 'post',
          url: 'http://localhost:3000/database/create',
          headers: {},
          data: {
            name: databaseName, // This is the body part
          }
        }).then(response => {
          if (response.data !== ""){
            this.err = response.data.sqlMessage
          }else {
            this.ok = "Success!"
            setTimeout(()=>{
              window.location.href = "/"
            }, 1000)
          }
          console.log(this.response)
        });


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