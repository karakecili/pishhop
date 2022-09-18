<template>
  <div class="header flex flex-col m-4">
    <div class="header-top flex flex-row justify-between">
      <div class="header-top-left">My Company</div>
      <!-- Company icon to be added -->
      <div class="header-top-right flex flex-row gap-3 justify-end">
        <button>
          <v-icon medium color="orange darken-2" class="cursor-pointer"
            >mdi-bell-outline</v-icon
          >
        </button>
        <button @click.prevent="$router.push('/cart')">
          <v-icon medium color="orange darken-2" class="cursor-pointer"
            >mdi-basket-outline</v-icon
          >
        </button>
        <button>
          <v-icon medium color="orange darken-2" class="cursor-pointer"
            >mdi-cards-heart-outline</v-icon
          >
        </button>
        <button>
          <v-icon medium color="orange darken-2" class="cursor-pointer"
            >mdi-magnify</v-icon
          >
        </button>
      </div>
    </div>
    <div class="header-bottom flex flex-row">
      <div class="mr-10" v-for="Category in getProductCategory">
        <span>{{ Category }}</span>
        <!-- Category tabs to be added -->
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
