<template>
  <div class="cart flex flex-col items-center rounded-3xl bg-purple-700 p-4">
    <div class="cart-top flex flex-row p-6">
      <button
        class="bg-white-500 hover:bg-white-700 text-black font-bold py-2 px-4 rounded"
        @click.prevent="$router.push('/')"
      >
        <v-icon large color="blue-grey darken-2"> mdi-arrow-left </v-icon>
      </button>
      <span>My cart</span>
    </div>
    <div class="cart-items flex flex-col bg-purple-700 gap-5">
      <CartItem
        v-for="item in getCart"
        :id="item.id"
        :size="item.size"
        :amount="item.amount"
        :key="item.key"
      />
    </div>
    <div class="cart-checkout">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-9 rounded-2xl mt-10"
      >
        GO TO CHECKOUT ${{ Total }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  computed: {
    Total() {
      return this.$store.getters.getCart
        .reduce(function (total, obj) {
          return total + obj.total;
        }, 0)
        .toFixed(2);
    },
    ...mapGetters(["getCart", "getSizes"]),
  },
};
</script>

<style></style>
