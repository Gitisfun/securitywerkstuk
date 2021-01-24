<template>
  <div class="home container">
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="false"
    ></b-loading>

    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <h1 class="is-size-1 has-text-black has-text-weight-bold">Posts</h1>
        </div>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <p class="level-item">
          <b-button v-if="canCreate" @click="newComment" type="is-success"
            >New post</b-button
          >
        </p>
      </div>
    </nav>
    <b-field>
      <b-input
        placeholder="Search a post..."
        v-model="searchTerm"
        @input.native="search"
      ></b-input>
    </b-field>
    <hr />
    <div v-for="comment in comments" :key="comment.id">
      <Comment
        :id="comment.id"
        :title="comment.title"
        :body="comment.body"
        :username="comment.user_username"
        :user_id="comment.user_id"
        :time="comment.time"
      />
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";
import { getAllComments } from "@/api/comments.js";

export default {
  name: "Home",
  components: {
    Comment,
  },
  data() {
    return {
      isLoading: true,
      comments: [],
      searchTerm: "",
      response: {},
      resError: {},
      firstLoad: 0
    };
  },
  computed: {
    canCreate: function () {
      if (this.$store.getters.getUser !== null) {
        if (this.$store.getters.getUser.role == 1) {
          return true;
        }
        return false;
      } else {
        return false;
      }
    },
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      if (this.firstLoad === 0) {
        this.isLoading = true;
        this.firstLoad += 1;
      }

      getAllComments(`?search=${this.searchTerm}`)
        .then((res) => {
          this.response = res.data;
          this.comments = res.data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.resError = err;
          this.isLoading = false;
        });
    },
    search() {
      this.fetchData();
    },
    newComment() {
      this.$router.push({
        name: "CommentCreate",
      });
    },
  },
};
</script>
