<template>
  <div class="container">
    <div class="box" id="createbox">
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <h1 class="title has-text-white">Add new post</h1>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <b-button @click="goBack" type="is-black">Back</b-button>
          </p>
        </div>
      </nav>
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
          v-model="comment.title"
        />
        <ValidatedTextArea
          rules="required"
          type="text"
          label="Body"
          v-model="comment.body"
        />
        <b-button @click="passes(submitted)">Add</b-button>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from "vee-validate";
import ValidatedInput from "@/components/ValidatedInput.vue";
import ValidatedTextArea from "@/components/ValidatedTextArea.vue";
import { createComment } from "@/api/comments.js";

export default {
  components: {
    ValidationObserver,
    ValidatedInput,
    ValidatedTextArea,
  },
  data() {
    return {
      isLoading: false,
      comment: {
        title: "",
        body: "",
        user_id: 0,
      },
      response: {},
      resError: {}
    };
  },
  methods: {
    submitted() {
      this.isLoading = true;
      this.comment.user_id = this.$store.getters.getUser.id;

      createComment(this.comment)
        .then((res) => {
          this.response = res;
          this.$router.push({
            name: "Home",
          });
          this.isLoading = false;
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
#createbox {
  background-color: #2ecc71;
  margin-top: 15px;
  margin-right: 15px;
  margin-left: 15px;
}
</style>