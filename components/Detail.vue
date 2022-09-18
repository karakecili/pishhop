<template>
  <div class="detail flex flex-col items-center rounded-3xl bg-white">
    <div class="detail-top flex flex-row p-6">
      <button
        class="bg-white-500 hover:bg-white-700 text-black font-bold py-2 px-4 rounded"
        @click.prevent="$router.push('/')"
      >
        <v-icon large color="blue-grey darken-2"> mdi-arrow-left </v-icon>
      </button>
      <img :src="Product.image" :alt="Product.description" class="h-40" />
      <button>
        <v-icon large color="blue-grey darken-2">
          mdi-cards-heart-outline
        </v-icon>
      </button>
    </div>
    <div
      class="detail-bottom flex flex-col bg-green-300 rounded-3xl p-6 w-full"
    >
      <div class="detail-category text-xl">
        {{ Product.category }}
      </div>
      <div
        class="detail-title justify-between flex flex-row text-3xl font-bold my-2"
      >
        <span>{{ Product.title }}</span>
        <span>${{ Product.price }}</span>
      </div>
      <div class="detail-rating flex flex-row mb-5">
        <v-rating
          v-model="Product.rating.rate"
          background-color="orange lighten-3"
          color="orange"
          length="5"
          half-increments
        >
        </v-rating>
        <span class="self-center text-lg ml-2">
          ({{ Product.rating.rate }})
        </span>
      </div>
      <div class="detail-amount flex flex-row justify-between my-5">
        <div class="detail-amount-div">
          <button
            class="text-white text-xl font-bold bg-blue-400 hover:bg-blue-700 rounded-full cursor-pointer px-3 py-1"
            @click="amountChange('dec')"
          >
            -
          </button>
          <span>{{ amount }}</span>
          <button
            class="text-white text-xl font-bold bg-blue-400 hover:bg-blue-700 rounded-full cursor-pointer px-3 py-1"
            @click="amountChange('inc')"
          >
            +
          </button>
        </div>
        <span class="ml-auto">icon</span>
      </div>
      <div class="detail-description flex flex-col my-6">
        <span class="font-bold uppercase">description</span>
        <span>{{ Product.description }}</span>
      </div>
      <div class="detail-size flex flex-col">
        <span class="font-bold uppercase">select size</span>
        <div class="flex flex-row gap-5">
          <div
            class="detail-size-icons items-center pl-4 bg-purple-500 hover:bg-purple-700 border border-gray-300 py-2 px-4 rounded-lg cursor-pointer"
            v-for="size in getSizes"
            @click="productSize = size.extention"
          >
            <input
              class="peer"
              type="radio"
              v-model="productSize"
              :value="size.extention"
              name="size"
              :id="size.id"
            />
            <label class="text-gray-100" :for="size.id">{{
              size.extention
            }}</label>
          </div>
        </div>
      </div>
      <div class="detail-button flex flex-row self-center my-5">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-9 rounded-2xl"
          @click="addToCart"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Detail",
  data() {
    return {
      amount: 1,
      productSize: "S",
    };
  },
  computed: {
    Product() {
      return this.$store.getters.getProductById(this.$route.params.Id);
    },
    ...mapGetters(["getProductById", "getSizes"]),
  },
  methods: {
    amountChange(type) {
      switch (type) {
        case "inc":
          this.amount++;
          break;
        case "dec":
          this.amount = this.amount - 1 || 1;
          break;
        default:
          break;
      }
    },
    addToCart() {
      this.$store.dispatch("addToCart", {
        id: this.Product.id,
        size: this.productSize,
        amount: this.amount,
      });

      this.amount = 1;
      this.productSize = "S";
    },
  },
};
</script>
