<template>
  <div class="box" id="commentbox">
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <div class="is-size-3 has-text-weight-medium titlecolor">
            {{ title }}
          </div>
        </div>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <span class="level-item tag is-link is-light is-medium">{{
          timeUpdated
        }}</span>
        <span class="level-item tag is-danger is-light is-medium">{{
          dateUpdated
        }}</span>
        <b-button @click="clickedRow" class="button level-item is-normal"
          >Details</b-button
        >
        
      </div>
    </nav>
    <div class="titlecolorb">Posted by {{ username }}</div>
    <div class="titlecolor">{{ body }}</div>
    <br />
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    title: String,
    body: String,
    username: String,
    user_id: Number,
    time: String,
  },
  computed: {
    dateUpdated() {
      const tempDate = new Date(this.time);
      return tempDate.toLocaleDateString();
    },
    timeUpdated() {
      const tempDate = new Date(this.time);
      if (0 <= tempDate.getMinutes() && tempDate.getMinutes() < 10) {
        return `${tempDate.getHours()}:0${tempDate.getMinutes()}`;
      }
      return `${tempDate.getHours()}:${tempDate.getMinutes()}`;
    },
  },
  methods: {
    clickedRow() {
      this.$router.push({
        name: "CommentRead",
        params: {
          id: this.id,
          user_id: this.user_id,
        },
      });
    },
  },
};
</script>

<style scoped>
#commentbox {
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
  margin-top: -25px;
}
.titlecolorc {
  color: r;
}
</style>