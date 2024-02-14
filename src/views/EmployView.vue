<template>
  <v-card flat>
    <div class="table" style="width: 90%; margin: auto;">
      <v-card-title class="d-flex align-center pe-2">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          density="compact"
          label="Search"
          single-line
          flat
          hide-details
          variant="solo-filled"
        ></v-text-field>
    </v-card-title>
    <v-divider></v-divider>
      <v-data-table v-model="selected" :search="search" :items="items" :headers="headers" return-object> 
      <template v-slot:[`item.image`]="{ item }">
        <v-card class="my-2" elevation="2" rounded>
          <v-img
            :src="`${item.image}`"
            height="64"
            cover
          ></v-img>
        </v-card>
      </template>
    </v-data-table>
    </div>
  </v-card>
</template>

<style>
.table {
  width: 90%;
  margin: auto;
}
</style>

<script>
  // v-for="item in prodotti" :key="item.id"
  export default {
    data () {
      return {
        search: '',
        headers: [
          {key: "firstName", title:"Nome"},
          {key: "lastName", title:"Cognome"},
          {key: "officeCode", title:"Numero ufficio"},
          {key: "jobTitle", title:"Lavoro"},
          {key: "employeeNumber", title:"Numero dipendente"},
          {key: "email", title:"Email"},
          {key: "extension", title:"Estensione"},
          {key: "reportsTo", title:"Riporta a"}
      ],
        items: [],
        selected: []
      }
    },
  methods: 
    {
    getUsers() {
        fetch("http://localhost:3000/employees/")
          .then((res) => res.json())
          .then((data) => {
            this.items = data
            console.log(data)
          })
          .catch((error) => {
            console.error("Error fetching:", error);
          });
      },
    print_selected() {
      var ids = []
      if(JSON.parse(localStorage.getItem("this.selected")) != null) {
        var selected_ids = JSON.parse(localStorage.getItem("this.selected"));
        for (i=0; i<selected_ids.length; i++) {
          ids.push(selected_ids[i])
        }
      }
      for(var i=0; i<this.selected.length; i++) {
        var exists = false
        for(var j=0; j<ids.length; j++) {
          if((this.selected[i].id == ids[j].id)) {
            exists = true
          }
        }
        if(this.selected[i].stock <= 0) {
          exists = true
        }
        if(!exists) {
          ids.push(this.selected[i])
        }
      }
      localStorage.setItem("this.selected", JSON.stringify(ids))
      var url = document.location.href.replace("users", "");
      document.location.href = url+"cart"
    }
  },
  mounted() {
    this.getUsers()
  },
  reserve() {
    this.loading = true
    setTimeout(() => (this.loading = false), 2000)
  }
  }
</script>