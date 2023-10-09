<template>
  <div class="databases">
    <h1>Databases</h1>
    <button class="btn btn-outline-success" v-on:click="this.$router.push('/database/create')" >Create</button>

    <form style="margin-top: 20px" class="form-group " @submit.prevent="uploadDB()" enctype="multipart/form-data">
      <input class="form-control" type="file" ref="file" accept=".sql" @change="onSelect">
      <button style="margin-top: 20px" class="btn btn-outline-primary">Upload</button>
    </form>

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
        <td scope="row">{{item.Database}}</td>
        <td>
          <button class="btn btn-outline-info" v-on:click="this.$router.push('/database/'+ item.Database)">Open</button>
        </td>
        <td>
          <a class="btn btn-outline-success" v-bind:href="'http://localhost:3000/database/' + item.Database + '/export'">Export</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DatabasesView",

  data() {
    return {
      data: null,
      importFile : ""
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
    },
    onSelect(){
      const file = this.$refs.file.files[0]
      this.file = file
    },
    async uploadDB(){
      const formData = new FormData()
      formData.append('file', this.file)
      try {
        await axios.post('http://localhost:3000/database/import', formData)
      }catch (err){
        console.log(err)
      }
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