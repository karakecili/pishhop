<template>
  <div class="landing flex flex-col m-4">
    <div class="landing-filter flex flex-row justify-between">
      <span>filter & sort</span>
      <span>icons</span>
    </div>
    <div
      class="landing-cart flex flex-row flex-wrap justify-between gap-2 gap-y-7"
    >
      <div
        class="landing-cart-item flex flex-col w-52 p-5 bg-gray-100 hover:bg-gray-200 cursor-pointer"
        v-for="Product in getProducts"
        @click.prevent="$router.push('/detail/' + Product.id)"
      >
        <div
          class="landing-cart-item-image self-center p-5 bg-indigo-200 rounded-lg"
        >
          <img :src="Product.image" :alt="Product.description" class="h-40" />
        </div>
        <div class="landing-cart-item-title text-center p-2 font-bold my-auto">
          {{ Product.title }}
        </div>
        <div class="landing-cart-item-price text-center text-gray-500">
          ${{ Product.price }} USD
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Landing",
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getProducts", "getProductById"]),
  },
  methods: {
    selectProduct(id) {
      console.log(this.$store.getters.getProductById(id));

      // $router.push('/detail/' + Product.id)
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
