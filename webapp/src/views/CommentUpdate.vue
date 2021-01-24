<template>
  <div class="container">
    <div class="box" id="updatebox">
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <h1 class="title has-text-white">Update post</h1>
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
import { getComment, updateComment } from "@/api/comments.js";

export default {
  components: {
    ValidationObserver,
    ValidatedInput,
    ValidatedTextArea,
  },
  data() {
    return {
      isLoading: true,
      comment: {
        title: "",
        body: "",
        user_id: 0,
      },
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
      this.comment.user_id = this.$store.getters.getUser.id;

      getComment(id)
        .then((res) => {
          this.comment = res.data[0];
          this.isLoading = false;
        })
        .catch((err) => {
          this.resError = err;
          this.isLoading = false;
        });
    },
    submitted() {
      this.isLoading = true;
      updateComment(this.$route.params.id, this.comment)
        .then((res) => {
          this.response = res.data;
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
#updatebox {
  background-color: #f1c40f;
  margin-top: 15px;
  margin-right: 15px;
  margin-left: 15px;
}
</style>