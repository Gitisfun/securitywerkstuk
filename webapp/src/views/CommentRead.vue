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
            <h1 class="title has-text-white">{{ comment.title }}</h1>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <b-button
              v-if="canUpdate"
              @click="updateCommentClick"
              type="is-warning"
              >Update</b-button
            >
          </p>
          <p class="level-item">
            <b-button
              v-if="canDelete"
              @click="deleteCommentClick"
              type="is-danger"
              >Delete</b-button
            >
          </p>
          <p class="level-item">
            <b-button @click="goBack" type="is-black">Back</b-button>
          </p>
        </div>
      </nav>
      <div class="titlecolorb">Posted by {{ comment.user_username }}</div>
      <p class="titlecolor">{{ comment.body }}</p>
      <hr />
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <span class="level-item tag is-link is-light is-medium">{{
            timeUpdated
          }}</span>
          <span class="level-item tag is-danger is-light is-medium">{{
            dateUpdated
          }}</span>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { getComment, deleteComment } from "@/api/comments.js";

export default {
  data() {
    return {
      isLoading: true,
      comment: {
        title: "",
        body: "",
        id: 0,
        time: "",
      },
      response: {},
      resError: {},
    };
  },
  created() {
    this.fetchData(this.$route.params.id);
  },
  computed: {
    canUpdate: function () {
      if (this.$store.getters.getUser !== null) {
        if (
          this.$store.getters.getUser.role === 1 &&
          this.$store.getters.getUser.id === this.$route.params.user_id
        ) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    },
    canDelete: function () {
      if (this.$store.getters.getUser !== null) {
        if (this.$store.getters.getUser.role === 2) {
          return true;
        } else if (
          this.$store.getters.getUser.role === 1 &&
          this.$store.getters.getUser.id === this.$route.params.user_id
        ) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    },
    dateUpdated() {
      const tempDate = new Date(this.comment.time);
      return tempDate.toLocaleDateString();
    },
    timeUpdated() {
      const tempDate = new Date(this.comment.time);
      if (0 <= tempDate.getMinutes() && tempDate.getMinutes() < 10) {
        return `${tempDate.getHours()}:0${tempDate.getMinutes()}`;
      }
      return `${tempDate.getHours()}:${tempDate.getMinutes()}`;
    },
  },
  methods: {
    fetchData(id) {
      this.isLoading = true;
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
    updateCommentClick() {
      this.$router.push({
        name: "CommentUpdate",
      });
    },
    deleteCommentClick() {
      deleteComment(this.$route.params.id)
        .then((res) => {
          this.comment = res.data[0];
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