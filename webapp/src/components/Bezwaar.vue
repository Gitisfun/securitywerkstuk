<template>
  <div class="box" id="bezwaarbox">
    <div class="is-size-3 has-text-weight-medium titlecolor">{{ title }}</div>
    <div class="titlecolorb">Send by {{ username }}</div>
    <div class="titlecolor">{{ body }}</div>
</div>
</template>

<script>
export default {
  props: {
    id: Number,
    title: String,
    body: String,
    username: String,
  }
};
</script>

<style>
#bezwaarbox {
  background: #e74c3c;
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