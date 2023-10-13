<template>
  <div class="databases">
    <h1>"{{this.$route.params.table}}"Entities</h1>
    <button class="btn btn-outline-warning form-control" v-on:click="this.$router.push('/database/' + this.$route.params.database)">Go Back</button>
    <button style="margin-top: 20px" class="btn btn-outline-success form-control" v-on:click="this.$router.push('/database/' + this.$route.params.database + '/table/' + this.$route.params.table + '/entity/create')">Create</button>
    <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Edit/Projection by field: </label>
    <select class="custom-select my-1 mr-sm-2" v-model="selectedField" id="inlineFormCustomSelectPref" required >
      <option v-for="(key, index) in data.uniqueKeys" v-bind:value="this.data.uniqueKeys[index]">{{key}}</option>
    </select>
    <label class="my-1 mr-2" for="valueInput">Edit/Projection by field value: </label>
    <input v-model="selectedValue" id="valueInput" type="text" class="form-control" >
    <label class="my-1 mr-2" for="opselect">Projection operator: </label>
    <select class="custom-select my-1 mr-sm-2" v-model="selectedOperator" id="opselect" required >
      <option value="<">&lt;</option>
      <option value=">">></option>
      <option value="=">=</option>
    </select>
    <button style="margin-top: 20px" v-bind:disabled="selectedValue == null || selectedField == null" v-on:click="this.$router.push('/database/' + this.$route.params.database + '/table/' + this.$route.params.table + '/edit/' + this.selectedField + '/' + selectedValue)" class="btn btn-outline-warning form-control">Edit</button>
    <button style="margin-top: 20px" v-bind:disabled="selectedValue == null || selectedField == null || selectedOperator == null" v-on:click="this.$router.push('/database/' + this.$route.params.database + '/table/' + this.$route.params.table + '/projection/' + this.selectedField + '/' + selectedOperator + '/' + selectedValue)" class="btn btn-outline-info form-control">Projection</button>
    <button style="margin-top: 20px" v-bind:disabled="selectedValue == null || selectedField == null" v-on:click="deleteEntity()" class="btn btn-outline-danger form-control">Delete</button>
    <h1 v-if="this.data.data.length === 0">Table is Empty!</h1>
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
  name: "EntitiesView",

  data() {
    return {
      data: null,
      selectedField : null,
      selectedValue : null,
      selectedOperator : null,
    }
  },
  created() {
    this.fetch()
  },
  methods : {

    deleteEntity(){
      axios({
        method: 'post',
        url: 'http://localhost:3000/database/' + this.$route.params.database + '/table/' + this.$route.params.table + '/entity/drop',
        headers: {},
        data: {
          database: this.$route.params.database, // This is the body part
          table : this.$route.params.table,
          column : this.selectedField,
          value : this.selectedValue,
        }
      }).then(r => {
        console.log(r)
        window.location.reload()
      })
    },
    fetch(){

      axios({
        method: 'post',
        url: 'http://localhost:3000/database/' + this.$route.params.database + '/table/' + this.$route.params.table,
        headers: {},
        data: {
          database: this.$route.params.database, // This is the body part
          table : this.$route.params.table
        }
      }).then((response => {
        console.log(response.data)
        this.data = response.data
        this.selectedFields = response.data.uniqueKeys[0]
      }));
    }
  }
}
</script>

<style scoped>

</style>