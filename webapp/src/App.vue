<template>
  <div id="app">
      <Navbar v-show="this.$route.name !== 'Login' && this.$route.name !== 'Register'" />
    <router-view />
  </div>
</template>


<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Home",
  components: {
    Navbar,
  },
};
</script>

<style>
#app {
  padding-bottom: 75px;
}
</style>
