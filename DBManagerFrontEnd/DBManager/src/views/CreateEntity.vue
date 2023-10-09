<template>
  <div class="main">
  <h1>Create Entity</h1>

  <button v-on:click="this.$router.push('/database/' + this.$route.params.database + '/table/' + this.$route.params.table)" class="btn btn-outline-warning">Go Back</button>

  <form @submit.prevent="createEntity()" class="needs-validation">

    <div style="margin-top: 20px" v-for="(item, index) in data" class="form-group form-check">

      <input v-model="data[index]" type="text" class="form-control" aria-describedby="emailHelp" placeholder="name" disabled>
      <input v-model="values[index]" type="text" class="form-control" aria-describedby="emailHelp" placeholder="value" required>

    </div>

    <button type="submit" class="btn btn-outline-success">Create</button>

  </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateEntity",
  data() {
    return {
      data: null,
      values : []
    }
  },
  created() {
    this.fetch()
  },
  methods : {
    createEntity(){
      axios({
        method: 'post',
        url: 'http://localhost:3000/database/' + this.$route.params.database + '/table/' + this.$route.params.table + '/entity/create',
        headers: {},
        data: {
          database: this.$route.params.database, // This is the body part
          table : this.$route.params.table,
          keys : this.data,
          values : this.values
        }
      }).then(response => {
        console.log(response)
        window.location.href = '/database/' + this.$route.params.database + '/table/' + this.$route.params.table
      })
    },
    fetch(){
      axios({
        method: 'post',
        url: 'http://localhost:3000/database/' + this.$route.params.database + '/table/' + this.$route.params.table + '/entity',
        headers: {},
        data: {
          database: this.$route.params.database, // This is the body part
          table : this.$route.params.table
        }
      }).then((response => {
        console.log(response.data)
        this.data = response.data.uniqueKeys
        for (let i = 0; i < this.data.length; i++) {
            this.values.push("")
        }
        console.log(this.values)
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