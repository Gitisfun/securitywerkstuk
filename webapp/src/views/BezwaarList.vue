<template>
  <div class="home container">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="false"
    ></b-loading>

    <h1 class="is-size-1 has-text-black has-text-weight-bold">Bezwaren</h1>

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
import Bezwaar from "@/components/Bezwaar.vue";
import { getAllBezwaren } from "@/api/mail.js";

export default {
  name: "Home",
  components: {
    Bezwaar,
  },
  data() {
    return {
      isLoading: true,
      bezwaren: [],
      response: {},
      resError: {},
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      getAllBezwaren()
        .then((res) => {
          this.bezwaren = res.data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.resError = err;
          this.isLoading = false;
        });
    },
  },
};
</script>
