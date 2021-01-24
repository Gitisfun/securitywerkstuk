<template>
  <section id="registerboxbackground" class="hero is-fullheight">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="false"
    ></b-loading>
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-4-widescreen">
            <div id="registerbox">
              <div id="titleregisterbox">
                <h1
                  class="is-size-3 has-text-centered has-text-dark has-text-weight-bold"
                >
                  Register
                </h1>
              </div>
              <ValidationObserver ref="observer" v-slot="{ passes }">
                <div id="fieldbox">
                  <ValidatedInput
                    rules="required|min:5"
                    type="text"
                    placeholder="Username"
                    v-model="user.username"
                  />
                </div>
                <div>
                  <ValidatedInput
                    rules="required|min:7"
                    type="password"
                    placeholder="Password"
                    v-model="user.password"
                  />
                  <ValidatedInput
                    rules="required|email"
                    type="email"
                    placeholder="Email"
                    v-model="user.email"
                  />
                </div>
                <div id="registerbtnbox"></div>
                <div v-show="error" v-bind:class="[errorBox, errorColor]">
                  <p class="has-text-white">{{ errorMessage }}</p>
                </div>
                <div class="buttons">
                  <b-button
                    @click="passes(register)"
                    style="margin-bottom: 35px"
                    class="has-text-weight-bold"
                    type="is-success"
                    expanded
                    >Register</b-button
                  >
                  <b-button
                    @click="goToLogin"
                    class="has-text-weight-bold"
                    expanded
                    >Go to login page</b-button
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
import sha1 from "js-sha1";
import axios from "axios";
import { register } from "@/api/register.js";

export default {
  name: "Register",
  data() {
    return {
      user: {
        username: "",
        password: "",
        email: "",
        role: 1,
      },
      errorBox: "box",
      errorMessage: "",
      error: false,
      errorColor: "errorboxcolorred",
      isLoading: false,
      response: {},
      resError: {},
    };
  },
  components: {
    ValidationObserver,
    ValidatedInput,
  },
  methods: {
    register() {
      this.isLoading = true;
      if (this.isValid(this.user.password)) {
        const sha = sha1(this.user.password).toUpperCase();
        const begin = sha.substring(0, 5);
        const end = sha.substring(5, sha.length);

        axios
          .get(`https://api.pwnedpasswords.com/range/${begin}`)
          .then((res) => {
            let hashes = res.data.split("\n");
            let breached = false;

            for (let i = 0; i < hashes.length; i++) {
              let hash = hashes[i];
              let h = hash.split(":");

              if (h[0] === end) {
                this.showErrorMessage(
                  true,
                  "Password is too weak, choose another one",
                  false
                );
                breached = true;
                break;
              }
            }
            if (!breached) {
              register(this.user)
                .then((res) => {
                  this.showErrorMessage(true, res.data.msg, res.data.status);
                })
                .catch((err) => {
                  this.resError = err;
                });
            }
            this.isLoading = false;
          })
          .catch((err) => {
            this.resError = err;
            this.isLoading = false;
          });
      } else {
        this.showErrorMessage(
          true,
          "Password must contain ASCII characters only",
          false
        );
        this.isLoading = false;
      }
    },
    isValid(str) {
      if (typeof str !== "string") {
        return false;
      }
      for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127) {
          return false;
        }
      }
      return true;
    },
    showErrorMessage(visibility, msg, success) {
      this.error = visibility;
      this.errorMessage = msg;
      if (success) {
        this.errorColor = "errorboxcolorgreen";
      } else {
        this.errorColor = "errorboxcolorred";
      }
    },
    goToLogin() {
      this.$router.push({
        name: "Login",
      });
    },
    goToPrivacy() {
      this.$router.push({
        name: "Privacyverklaring",
      });
    },
  },
};
</script>

<style scoped>
#registerboxbackground {
  background: #bdc3c7;
  height: 100%;
}
#registerbox {
  position: relative;
  max-width: 600px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px rgba(255, 255, 255, 0.2);
}
#titleregisterbox {
  margin-bottom: 50px;
}
#fieldbox {
  margin-bottom: 15px;
}
#registerbtnbox {
  margin-top: 25px;
}
.errorboxcolorred {
  background-color: red;
}
.errorboxcolorgreen {
  background-color: green;
}
</style>