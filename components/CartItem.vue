<template>
  <div class="cartItem flex flex-row bg-white p-5 gap-4 rounded-xl">
    <div class="cartItem-left w-[144px] p-3">
      <img :src="Product.image" :alt="Product.description" class="h-40" />
    </div>
    <div class="cartItem-middle flex flex-col justify-evenly">
      <span class="text-xl text-purple-800 font-bold">{{ Product.title }}</span>
      <span>{{ $store.getters.getSizeById(size).name }}</span>
      <span class="text-lg font-bold">${{ Product.price }} USD</span>
    </div>
    <div class="cartItem-right w-[120px] flex flex-col justify-evenly">
      <button class="cursor-pointer" @click="deleteProduct">
        <v-icon large color="blue-grey darken-2"> mdi-delete </v-icon>
      </button>
      <div class="cartItem-right-buttons">
        <button
          class="text-white text-xl font-bold bg-blue-400 hover:bg-blue-700 rounded-full cursor-pointer px-3 py-1"
          @click="amountChange('dec')"
        >
          -
        </button>
        <span>{{ Cart.amount }}</span>
        <button
          class="text-white text-xl font-bold bg-blue-400 hover:bg-blue-700 rounded-full cursor-pointer px-3 py-1"
          @click="amountChange('inc')"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "CartItem",
  props: { id: Number, size: String },
  data() {
    return {};
  },
  computed: {
    Product() {
      return this.$store.getters.getProductById(this.id);
    },
    Cart() {
      return this.$store.getters.getCartById(this.id, this.size);
    },
    ...mapGetters([
      "getProducts",
      "getProductById",
      "getSizeById",
      "getCartById",
    ]),
  },
  methods: {
    amountChange(type) {
      if (type == "inc") {
        this.$store.commit("addToCart", {
          id: this.Cart.id,
          size: this.Cart.size,
          amount: 1,
        });
      } else if (type == "dec" && this.Cart.amount == 1) {
        this.deleteProduct();
      } else if (type == "dec") {
        this.$store.commit("addToCart", {
          id: this.Cart.id,
          size: this.Cart.size,
          amount: -1,
        });
      }
    },
    deleteProduct() {
      this.$store.commit("removeFromCart", {
        id: this.Cart.id,
        size: this.Cart.size,
      });
    },
  },
  mounted() {},
};
</script>

<style></style>
