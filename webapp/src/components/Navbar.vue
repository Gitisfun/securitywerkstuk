<template>
  <b-navbar id="navbox">
    <template #start>
      <div class="buttons">
        <a @click="homeNav" class="button is-text">Home</a>
        <a @click="privacyNav" class="button is-text">Privacyverklaring</a>
        <a
          @click="bezwaarNav"
          class="button is-text"
          v-if="!loggedIn && canBezwaar"
          >Bezwaren</a
        >
      </div>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <p v-if="!loggedIn" style="margin-right: 25px">
          Welcome, <b>{{ username }} </b>
        </p>
        <div class="buttons">
          <a v-if="!loggedIn" @click="profile" class="button is-info"
            >Profile</a
          >
          <a v-if="loggedIn" @click="login" class="button is-success">Login</a>
          <a v-else @click="logout" class="button is-primary">Logout</a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    username: function () {
      if (this.$store.getters.getUser !== null) {
        return this.$store.getters.getUser.username;
      } else {
        return "";
      }
    },
    canBezwaar: function () {
      if (this.$store.getters.getUser !== null) {
        if (this.$store.getters.getUser.role == 2) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    },
    loggedIn: function () {
      if (this.$store.getters.getToken !== null) {
        return false;
      } else {
        return true;
      }
    },
  },

  methods: {
    homeNav() {
      this.$router.push({
        name: "Home",
      });
    },
    privacyNav() {
      this.$router.push({
        name: "Privacyverklaring",
      });
    },
    bezwaarNav() {
      this.$router.push({
        name: "BezwaarList",
      });
    },
    login() {
      this.$router.push({
        name: "Login",
      });
    },
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "Home",
      });
      this.$router.go();
    },
    profile() {
      this.$router.push({
        name: "Profile",
        params: {
          id: this.$store.getters.getUser.id,
        },
      });
    },
  },
};
</script>

<style>
#navbox {
  background-color: #ecf0f1;
}
</style>