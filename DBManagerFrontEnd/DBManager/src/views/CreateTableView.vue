<template>
  <div class="create">
    <h1>Create Table</h1>
    <div class="buttons">
      <button v-on:click="this.$router.push('/' + this.$route.params.database)" class="btn btn-outline-warning" >Go Back</button>
      <button class="btn btn-outline-info" v-on:click="addField()" >Add Field</button>
    </div>
    <form @submit.prevent="createTable()" class="needs-validation">
      <label for="tableName">Table Name</label>
      <input id="tableName" type="text" class="form-control" v-model="table" required>
      <div style="margin-top: 20px" v-for="(field, index) in formFields" class="form-group form-check">
        <label for="exampleInputEmail1">Field Info</label>
        <input v-model="formFields[index].name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="name" required>
        <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" v-model="formFields[index].type" required >
          <option value="INT">INT</option>
          <option value="VARCHAR(250)">VARCHAR</option>
          <option value="DECIMAL(16,2)">$MONEY</option>
          <option value="CHAR(1)">CHAR</option>
          <option value="DOUBLE">REAL</option>
        </select>

        <span style="margin-right: 40px">Allow NULL</span>
        <input type="checkbox" class="form-check-input" id="checkbox" v-model="formFields[index].nullable">
      </div>
      <button style="margin-top: 20px" type="submit" class="btn btn-outline-success">Create</button>
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
  name: "CreateTableView",
  data() {
    return {
      formFields : [],
      table : "",
      err : null,
      ok : null
    }
  },
  methods : {
    createTable(){
      this.err = null
      this.ok = null
      axios({
        method: 'post',
        url: 'http://localhost:3000/database/table/create',
        headers: {},
        data: {
          database : this.$route.params.database,
          table : this.table,
          props: this.formFields
        }
      }).then(response => {
        console.log(response)
        if (response.data !== ""){
          this.err = response.data.sqlMessage
        }else {
          this.ok = "Success!"
          setTimeout(()=>{
            window.location.href = "/" + this.$route.params.database
          }, 1000)
        }

      });


    },
    addField(){
      this.formFields.push(
          {
            name : "",
            type : "INT",
            nullable : true
          }
      )
    }
  }
}
</script>

<style scoped>
.create{
  display: flex;
  flex-direction: column;
}

.buttons{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 20px;
}

</style>