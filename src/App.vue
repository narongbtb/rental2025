<template>
  <nav v-if="userAuth.userId">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/contact">Contact</router-link> |
    <router-link to="/product">Product</router-link>
    <v-btn @click="logout">Logout</v-btn>
  </nav>
  <router-view/>
</template>

<script>
  import {userStore} from "@/store/userStore"
  export default {
      methods: {
        logout() {
          const useUserStore=userStore();
          useUserStore.logout();
          this.$router.push("/login");
        }
      },
      computed: {
        userAuth() {
          return userStore(); 
        }
      },
  }
</script>

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
