<template>
  <v-card flat>
    <div class="table">
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
      Buy products

      <v-spacer></v-spacer>
      <v-btn variant="outlined" @click="buy_selected">
        Buy Selected
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn variant="outlined" @click="buy_all">
        Buy All
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
      <v-data-table v-model="selected" :items="items" show-select return-object> 
      <template v-slot:[`item.image`]="{ item }">
        <v-card class="my-2" elevation="2" rounded>
          <v-img
            :src="`${item.image}`"
            height="64"
            cover
          ></v-img>
        </v-card>
      </template>

      <template v-slot:[`item.rating`]="{ item }">
        <v-rating
          :model-value="item.rating.rate"
          color="orange-darken-2"
          density="compact"
          size="small"
          readonly
        ></v-rating>
      </template>

      <template v-slot:[`item.stock`]="{ item }">
        <div class="text-end">
          <v-chip
            :color="item.stock ? 'green' : 'red'"
            :text="item.stock ? 'In stock'+'('+item.stock+')' : 'Out of stock'"
            class="text-uppercase"
            label
            size="small"
          ></v-chip>
        </div>
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
        items: [],
        selected: []
      }
    },
  methods: {
    getProdotti() {
      fetch('https://fakestoreapi.com/products')
        .then((res) => res.json())
        .then((json) => {
          var selected_values = []
          var selected_ids = []
          if(localStorage.length != 0) {
            selected_ids = JSON.parse(localStorage.getItem("this.selected"));
            for (var i=0; i<selected_ids.length; i++) {
              var this_id = selected_ids[i].id
              var exists = false
              for(var j=0; j<selected_ids.length; j++) {
                if(this_id == selected_ids[j].id && i != j) {
                  exists = true
                }
              }
              if(!exists) {
                selected_values.push(selected_ids[i])
              }
            }
            json = selected_values
          }
          json = sortById(json)
          this.items = json
        })
    },
    buy_selected() {
      var price = 0
      for(var i=0; i<this.selected.length; i++) {
        price += this.selected[i].price
      }
      if(this.selected.length != 0) {
        removeStocks(this.selected)
        alert("You bought "+this.selected.length+" products for "+price+"€")
        console.log(price)
        let currentURL = document.location.href;
        let updatedURL = currentURL.replace("cart", "");
        window.location.href = updatedURL+"products";
      }
    },
    buy_all() {
      var price = 0
      for(var i=0; i<this.items.length; i++) {
        price += this.items[i].price
      }
      if(JSON.parse(localStorage.getItem("this.selected")).length > 0) {
        removeStocks(JSON.parse(localStorage.getItem("this.selected")))
        alert("You bought "+this.items.length+" products for "+price+"€")
        console.log(price)
        let currentURL = document.location.href;
        let updatedURL = currentURL.replace("cart", "");
        window.location.href = updatedURL+"products";
      }
    }
  },
  mounted() {
    this.getProdotti();
  },
  reserve() {
    this.loading = true
    setTimeout(() => (this.loading = false), 2000)
  }
  }
function sortById(arr) {
  return arr.sort((a, b) => a.id - b.id);
}
function removeStocks(selected) {
  var all = JSON.parse(localStorage.getItem("stocked_values"));
  var selected_ids = JSON.parse(localStorage.getItem("this.selected"));
  var remained = []
  for(var i=0; i<selected.length; i++) {
    for(var j=0; j<all.length; j++) {
      if(( (selected[i].id) -1 )  == j) {
        all[j] = all[j] - 1
        console.log(all[j])
      }
    }
  }
  for(i=0; i<selected_ids.length; i++) {
    var exists = false
    for(j=0; j<selected.length; j++) {
      if(selected_ids[i].id == selected[j].id) {
        exists = true
      }
    }
    if(!exists) {
      remained.push(selected_ids[i])
    }
  }
  console.log(remained)
  localStorage.setItem("stocked_values", JSON.stringify(all))
  localStorage.setItem("this.selected", JSON.stringify(remained))
}
</script>