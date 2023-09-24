<template>

  <div class="main">

    <h1>Edit Table Entity</h1>
    <h2>Where {{this.$route.params.field}} = {{this.$route.params.value}}</h2>
    <button v-on:click="this.$router.push('/' + this.$route.params.database + '/' + this.$route.params.table)" class="btn btn-outline-warning">Go Back</button>

    <form @submit.prevent="editEntity()" class="needs-validation">

      <div style="margin-top: 20px" v-for="(item, index) in newValues" class="form-group form-check">

        <input v-model="newValues[index].name" type="text" class="form-control" aria-describedby="emailHelp" placeholder="name" disabled>
        <input v-model="newValues[index].value" type="text" class="form-control" aria-describedby="emailHelp" placeholder="value" required>

      </div>

      <button type="submit" class="btn btn-outline-warning">Edit</button>

    </form>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "EditEntityView",
  data() {
    return {
      data: null,
      newValues : []
    }
  },
  created() {
    this.fetch()
  },
  methods : {

    editEntity(){
      console.log(
          {
            database : this.$route.params.database,
            table : this.$route.params.table,
            columnName : this.$route.params.field,
            rowValue : this.$route.params.value,
            props : this.newValues
          }
      )

      axios({
        method: 'post',
        url: 'http://localhost:3000/database/table/edit',
        headers: {},
        data: {
          database : this.$route.params.database,
          table : this.$route.params.table,
          columnName : this.$route.params.field,
          rowValue : this.$route.params.value,
          props : this.newValues
        }
      }).then(response => {
        console.log(response)
        window.location.href = '/' + this.$route.params.database + '/' + this.$route.params.table
      })

    },
    fetch(){

      axios({
        method: 'post',
        url: 'http://localhost:3000/database/table',
        headers: {},
        data: {
          database: this.$route.params.database, // This is the body part
          table : this.$route.params.table
        }
      }).then((response => {
        console.log(response.data)
        this.data = response.data
        for (let i = 0; i < this.data.uniqueKeys.length; i++) {
          this.newValues.push({
            name : this.data.uniqueKeys[i],
            value : ""
          })
        }
        console.log(this.newValues)
      }));
    }
  }
}
</script>

<style scoped>
  .main{
      display: flex;
    flex-direction: column;
  }
</style>