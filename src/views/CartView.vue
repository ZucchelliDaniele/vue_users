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
  // v-for="item in prodotti" :key="item.productCode"
  // import prodotti from "../prodotti.js"
  export default {
    data () {
      return {
        items: [],
        selected: []
      }
    },
  methods: {
    buy_selected() {
      var price = 0
      for(var i=0; i<this.selected.length; i++) {
        price += this.selected[i].buyPrice
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
      console.log(this.items.length)
      for(var i=0; i<this.items.length; i++) {
        price += this.items[i].buyPrice
      }
      if(localStorage.getItem("this.selected")!= null) {
        if(JSON.parse(localStorage.getItem("this.selected")).length > 0) {
          removeStocks(JSON.parse(localStorage.getItem("this.selected")))
          alert("You bought "+this.items.length+" products for "+price+"€")
          console.log(price)
          let currentURL = document.location.href;
          let updatedURL = currentURL.replace("cart", "");
          window.location.href = updatedURL+"products";
        }
      }
    }
  },
  mounted() {
    var json = []
    var selected_values = []
          var selected_ids = []
          if(JSON.parse(localStorage.getItem("this.selected")) != null) {
            selected_ids = JSON.parse(localStorage.getItem("this.selected"));
            for (var i=0; i<selected_ids.length; i++) {
              var this_id = selected_ids[i].productCode
              console.log("ID:",this_id)
              var exists = false
              for(var j=0; j<selected_values.length; j++) {
                if(this_id == selected_values[j].productCode) {
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
  },
  reserve() {
    this.loading = true
    setTimeout(() => (this.loading = false), 2000)
  }
  }
function sortById(arr) {
  return arr.sort((a, b) => a.productCode - b.productCode);
}
function removeStocks(selected) {
  var selected_ids = JSON.parse(localStorage.getItem("this.selected"));
  var remained = []
  for(var i=0; i<selected_ids.length; i++) {
    var exists = false
    for(var j=0; j<selected.length; j++) {
      if(selected_ids[i].productCode == selected[j].productCode) {
        exists = true
      }
    }
    if(!exists) {
      remained.push(selected_ids[i])
    }
  }
  console.log(remained)
  localStorage.setItem("this.selected", JSON.stringify(remained))
}
</script>