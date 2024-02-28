<template>
  <v-app>
    <v-app-bar app color="dark darken-2">
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">Zucchelli Shop</v-toolbar-title>
      <v-spacer></v-spacer>
     
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" temporary>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer class="bg-grey-lighten-1">
    <v-row justify="center" no-gutters>
      
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Zucchelli Shop - Website for School</strong>
      </v-col>
    </v-row>
  </v-footer>

  </v-app>
</template>

<script>
import store from './store'
var isLogged = setInterval( ()=> {
  if(store.getters.isLoggedIn) {
    console.log("Logged")
    clearInterval(isLogged)
  }
}, 200)
export default {
  data() {
    return {
      drawer: false,
      items: [
        { text: 'Home', icon: 'mdi-home', to: '/' },
        { text: 'Login', icon: 'mdi-login', to: '/login' },
        { text: 'Register', icon: 'mdi-account-plus', to: '/register' },
        { text: 'About', icon: 'mdi-information', to: '/about' },
        { text: 'Shop', icon: 'mdi-store', to: '/products' },
        { text: 'Cart', icon: 'mdi-cart', to: '/cart' },
        { text: 'Users', icon: 'mdi-account-supervisor', to: '/users' },
        { text: 'Employees', icon: 'mdi-security', to: '/employees' },
      ],
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
};
</script>

<style>
@media (max-width: 600px) {
  .v-navigation-drawer {
    width: 200px;
  }
}

</style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>