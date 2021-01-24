<template>
  <div class="container">
    <div class="box" id="updatebox">
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
            <b-button @click="goBack" type="is-black">Back</b-button>
          </p>
        </div>
      </nav>
      <p class="has-text-white">
        Send a message and tell us more about your objection.
      </p>
      <br />
      <ValidationObserver ref="observer" v-slot="{ passes }">
        <b-loading
          :is-full-page="true"
          :active.sync="isLoading"
          :can-cancel="false"
        ></b-loading>
        <ValidatedInput
          rules="required"
          type="text"
          label="Title"
          v-model="message.title"
        />
        <ValidatedTextArea
          rules="required"
          type="text"
          label="Body"
          v-model="message.body"
        />
        <b-button @click="passes(submitted)">Send</b-button>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import ValidatedInput from "@/components/ValidatedInput.vue";
import ValidatedTextArea from "@/components/ValidatedTextArea.vue";
import { sendMail } from "@/api/mail.js";

export default {
  components: {
    ValidationObserver,
    ValidatedInput,
    ValidatedTextArea,
  },
  data() {
    return {
      isLoading: false,
      response: {},
      resError: {},
      message: {
        title: "",
        body: "",
        user_id: 0,
        username: "",
      },
    };
  },
  created() {
    this.message.user_id = this.$route.params.user_id;
  },
  methods: {
    submitted() {
      this.isLoading = true;
      sendMail(this.message)
        .then((res) => {
          this.result = res.data;
          this.isLoading = false;
          this.$router.go(-1);
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
#updatebox {
  background-color: #f1c40f;
  margin-top: 15px;
  margin-right: 15px;
  margin-left: 15px;
}
</style>