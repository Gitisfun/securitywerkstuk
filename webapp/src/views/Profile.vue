<template>
  <div class="container">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="false"
    ></b-loading>
    <div class="box" id="detailbox">
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <h1 class="title has-text-white">Profile: {{ user.username }}</h1>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <b-button @click="goBack" type="is-black">Back</b-button>
          </p>
        </div>
      </nav>
      <p class="subtitle"><b>My personal information</b></p>
      <br />
      <p class="subtitle">
        <b>Email:</b> <i>{{ user.email }}</i>
      </p>
      <br>
      <hr />
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <h1 class="title has-text-white">Update your personal info</h1>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <b-button @click="updateUserClick" type="is-warning"
              >Update</b-button
            >
          </p>
        </div>
      </nav>
      <hr />
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <h1 class="title has-text-white">Bezwaar indienen</h1>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <b-button @click="bezwaarClick" type="is-danger is-light"
              >Bezwaar indienen</b-button
            >
          </p>
        </div>
      </nav>
      <hr />
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <h1 class="title has-text-white">Delete my account</h1>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <b-button @click="deleteUserClick" type="is-danger"
              >Delete</b-button
            >
          </p>
        </div>
      </nav>
      <hr>
    </div>
    <h1 class="is-size-2 has-text-black has-text-weight-bold">Mijn bezwaren</h1>

    <div v-for="bezwaar in bezwaren" :key="bezwaar.id">
      <Bezwaar
        :id="bezwaar.id"
        :title="bezwaar.title"
        :body="bezwaar.body"
        :username="bezwaar.user_username"
      />
    </div>
  </div>
</template>

<script>
import { getUser, deleteUser } from "@/api/user.js";
import Bezwaar from "@/components/Bezwaar.vue";
import { getAllBezwaren } from "@/api/mail.js";
import axios from "axios";

export default {
  components: {
    Bezwaar,
  },
  data() {
    return {
      isLoading: true,
      user: {
        id: 0,
        username: "",
        email: "",
      },
      bezwaren: [],
      response: {},
      resError: {},
    };
  },
  created() {
    this.fetchData(this.$route.params.id);
  },
  methods: {
    fetchData(id) {
      this.isLoading = true;
      axios
        .all([getUser(id), getAllBezwaren()])
        .then((res) => {
          this.user = res[0].data[0];
          this.bezwaren = res[1].data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.resError = err;
          this.isLoading = false;
        });
    },
    updateUserClick() {
      this.$router.push({
        name: "ProfileEdit",
      });
    },
    bezwaarClick() {
      this.$router.push({
        name: "Bezwaar",
        params: {
          user_id: this.user.id,
        },
      });
    },
    deleteUserClick() {
      deleteUser(this.$route.params.id)
        .then((res) => {
          this.user = res.data[0];
          this.isLoading = false;
          this.$store.dispatch("setToken", null);
          this.$store.dispatch("setUser", null);
          this.$router.go();
        })
        .catch((err) => {
          this.resError = err;
          this.isLoading = false;
        });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
#detailbox {
  background: #3498db;
  margin-top: 15px;
  margin-right: 15px;
  margin-left: 15px;
}

.titlecolor {
  color: #ecf0f1;
}
.titlecolorb {
  color: yellow;
}
</style>