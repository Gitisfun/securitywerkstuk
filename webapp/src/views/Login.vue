<template>
  <section id="loginboxbackground" class="hero is-fullheight">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="false"
    ></b-loading>
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-4-widescreen">
            <div id="loginbox">
              <div id="titleloginbox">
                <h1
                  class="is-size-3 has-text-centered has-text-dark has-text-weight-bold"
                >
                  Login
                </h1>
              </div>
              <ValidationObserver ref="observer" v-slot="{ passes }">
                <div id="fieldbox">
                  <ValidatedInput
                    rules="required"
                    type="text"
                    placeholder="Username"
                    v-model="user.username"
                  />
                </div>
                <div>
                  <ValidatedInput
                    rules="required"
                    type="password"
                    placeholder="Paswoord"
                    v-model="user.password"
                  />
                </div>
                <div id="loginbtnbox"></div>
                <div v-show="error" v-bind:class="[errorBox, errorColor]">
                  <p class="has-text-white">{{ errorFeedback }}</p>
                </div>
                <div class="buttons">
                  <b-button
                    style="margin-bottom: 35px"
                    @click="passes(logginIn)"
                    class="has-text-weight-bold"
                    type="is-success"
                    expanded
                    >Login</b-button
                  >
                  <b-button
                    @click="goToRegister"
                    class="has-text-weight-bold"
                    expanded
                    >Go to register page</b-button
                  >

                  <b-button
                    @click="goToHome"
                    class="has-text-weight-bold is-info"
                    expanded
                    >Homepage</b-button
                  >
                  <b-button
                    @click="goToPrivacy"
                    class="has-text-weight-bold is-primary"
                    expanded
                    >Privacyverklaring</b-button
                  >
                </div>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import ValidatedInput from "@/components/ValidatedInput.vue";
import { login } from "@/api/login.js";

export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      errorBox: "box",
      errorMessage: "",
      error: false,
      errorColor: "errorboxcolorred",
      delay: 0,
      isLoading: false,
      response: {},
      resError: {},
    };
  },
  components: {
    ValidationObserver,
    ValidatedInput,
  },
  computed: {
    errorFeedback: function () {
      if (this.delay > 0) {
        return `${this.errorMessage}.\n Too many tries!! Try again in ${
          this.delay / 1000
        } seconds.`;
      }
      return `${this.errorMessage}`;
    },
  },
  methods: {
    logginIn() {
      this.isLoading = true;
      login(this.user)
        .then((res) => {
          this.showErrorMessage(
            true,
            res.data.msg,
            res.data.delay,
            res.data.status
          );
          this.isLoading = false;
          if (res.data.token) {
            this.$store.dispatch("setToken", res.data.token);
            this.$store.dispatch("setUser", res.data);
            this.$router.push({
              name: "Home",
            });
          }
        })
        .catch((err) => {
          this.resError = err;
          this.isLoading = false;

          this.showErrorMessage(
            true,
            0,
            "Something on the server went wrong, try again later!",
            false
          );
        });
    },
    goToRegister() {
      this.$router.push({
        name: "Register",
      });
    },
    goToHome() {
      this.$router.push({
        name: "Home",
      });
    },
    goToPrivacy() {
      this.$router.push({
        name: "Privacyverklaring",
      });
    },
    showErrorMessage(visibility, msg, delay, success) {
      this.error = visibility;
      this.errorMessage = msg;
      this.delay = delay;
      if (success) {
        this.errorColor = "errorboxcolorgreen";
      } else {
        this.errorColor = "errorboxcolorred";
      }
    },
  },
};
</script>

<style scoped>
#loginboxbackground {
  background: #bdc3c7;
  height: 100%;
}
#loginbox {
  position: relative;
  max-width: 600px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px rgba(255, 255, 255, 0.2);
}
#titleloginbox {
  margin-bottom: 50px;
}
#fieldbox {
  margin-bottom: 15px;
}
#loginbtnbox {
  margin-top: 25px;
}
.errorboxcolorred {
  background-color: red;
}
.errorboxcolorgreen {
  background-color: green;
}
</style>