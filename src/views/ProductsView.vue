<template>
  <div class="table" style="width: 80%;">
    <v-data-iterator
    :items="mice"
    :items-per-page="itemsPerPage"
  >
    <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
      <h1 class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center">
        <div class="text-truncate">
          Products
        </div>

        <div class="d-flex align-center">
          <v-btn
            class="me-8"
            variant="text"
            @click="onClickSeeAll"
          >
            <span class="text-decoration-underline text-none">See all</span>
          </v-btn>

          <div class="d-inline-flex">
            <v-btn
              :disabled="page === 1"
              icon="mdi-arrow-left"
              size="small"
              variant="tonal"
              class="me-2"
              @click="prevPage"
            ></v-btn>

            <v-btn
              :disabled="page === pageCount"
              icon="mdi-arrow-right"
              size="small"
              variant="tonal"
              @click="nextPage"
            ></v-btn>
          </div>
        </div>
      </h1>
    </template>

    <template v-slot:default="{ items }">
      <v-row>
        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
          sm="4"          
          xl="3"
        >
          <v-sheet border>
            <v-img
              :gradient="`to top right, rgba(255, 255, 255, .1), rgba(${item.raw.color}, .15)`"
              :src="item.raw.img"
              cover
              height="300"
            ></v-img>

            <v-list-item
              :title="item.raw.productName"
              lines="one"
              density="comfortable"
            >
              <template v-slot:title>
                <strong class="text-h6">
                  {{ item.raw.productName }}
                </strong>
              </template>
            </v-list-item>

            <v-table density="compact">
              <tbody class="text-caption">
                <tr align="right">
                  <th>ID:</th>

                  <td>{{ item.raw.productCode }}</td>
                </tr>

                <tr align="right">
                  <th>Description:</th>

                  <td>{{ item.raw.productDescription }}</td>
                </tr>

                <tr align="right">
                  <th>Stocked:</th>

                  <td>$ {{ item.raw.quantityInStock }}</td>
                </tr>

                <tr align="right">
                  <th>MSRP:</th>

                  <td>{{ item.raw.MSRP }}</td>
                </tr>

                <tr align="right">
                  <th>Price:</th>

                  <td>$ {{ item.raw.buyPrice }}</td>
                </tr>
              </tbody>
            </v-table>

            <v-btn variant="outlined" @click="add_item(item.raw)">
              Add to cart
            </v-btn>
          </v-sheet>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
  </div>
</template>

<style>
.table {
  width: 60%;
  margin: auto;
}
</style>

<script>
  export default {
    data () {
      return {
        itemsPerPage: 4,
        mice: [],
      }
    },
    methods: {
      getProducts() {
        fetch("http://localhost:3000/products")
          .then((res) => res.json())
          .then((data) => {
            this.mice = data
            console.log(data)
          })
          .catch((error) => {
            console.error("Error fetching:", error);
          });
      },
      onClickSeeAll () {
        this.itemsPerPage = this.itemsPerPage === 4 ? this.mice.length : 4
      },
      add_item(item) {
        console.log(item)
        var selected_items = []
        if(JSON.parse(localStorage.getItem("this.selected")) != null) {
          var ids = JSON.parse(localStorage.getItem("this.selected"))
          console.log(ids)
          for(var j=0; j<ids.length; j++) {
            selected_items.push(ids[j])
          }
        }
        selected_items.push(item)
        localStorage.setItem("this.selected", JSON.stringify(selected_items))
      }
    },
    mounted() {
        this.getProducts()
    }
  }
</script>