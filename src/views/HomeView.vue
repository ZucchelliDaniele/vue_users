<template>
  <v-card flat>
    <div class="table">
    <v-card-title class="d-flex align-center pe-2">
      Bella bro
    </v-card-title>
    </div>
  </v-card>
</template>

<style>
.table {
  width: 60%;
  margin: auto;
}
</style>

<script>
  // v-for="item in prodotti" :key="item.id"
  export default {
    data () {
      return {
        items: [],
        selected: []
      }
    },
  methods: {
    getProdotti() {
      fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((json) => {
          var stocked_values = []
          for(var i=0; i<json.length; i++) {
            json[i].stock = Math.floor(Math.random() * 100)
            if(json[i].stock < 0) {
              json[i].stock = 0
            }
            stocked_values.push(json[i].stock)
          }
          if(JSON.parse(localStorage.getItem("stocked_values"))!= null) {
            stocked_values = JSON.parse(localStorage.getItem("stocked_values"));
            for(i=0; i<json.length; i++) {
              json[i].stock = stocked_values[i]
            }
          }
          else {
            localStorage.setItem("stocked_values", JSON.stringify(stocked_values))
          }
          this.items = json
        })
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
      document.location.href = document.location.href+"cart"
    }
  },
  mounted() {
    this.getProdotti()
  },
  reserve() {
    this.loading = true
    setTimeout(() => (this.loading = false), 2000)
  }
  }
</script>