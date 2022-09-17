<template>
  <div class="header flex flex-col m-4">
    <div class="header-top flex flex-row">Logo and menu images</div>
    <div class="header-bottom flex flex-row">
      <div class="mr-10" v-for="Category in getProductCategory">
        <span>{{ Category }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Header",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getProductCategory"]),
  },
};
</script>
