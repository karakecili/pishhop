<template>
  <div class="detail flex flex-col">
    <div class="detail-top flex flex-row">
      <button
        class="bg-white-500 hover:bg-white-700 text-black font-bold py-2 px-4 rounded"
        @click.prevent="$router.push('/')"
      >
        Back icon
      </button>
      <img :src="Product.image" :alt="Product.description" class="h-40" />
      <button>Heart icon</button>
    </div>
    <div class="detail-bottom flex flex-col">
      <div class="detail-category">
        {{ Product.category }}
      </div>
      <div class="detail-title">
        {{ Product.title }}
        {{ Product.price }}
      </div>
      <div class="detail-rating">
        {{ Product.rating.rate }}
        {{ Product.rating.count }}
      </div>
      <div class="detail-count">
        <span>icon</span>
      </div>
      <div class="detail-description">
        <span>description</span>
        <span>{{ Product.description }}</span>
      </div>
      <div class="detail-size flex flex-col">
        <span>select size</span>
        <div class="flex flex-row my-5 gap-5">
          <div
            class="detail-size-icons flex items-center pl-4 bg-purple-500 hover:bg-purple-700 border border-gray-300 py-2 px-4 rounded-lg cursor-pointer"
            v-for="size in getSizes"
          >
            <!-- <button
              class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              {{ size.extention }}
            </button> -->

            <input
              class="peer"
              type="radio"
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
      <div class="detail-button">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          ADD TO CART
        </button>
      </div>

      <div class="detail-temp">
        {{ Product }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    Product() {
      return this.$store.getters.getProductById(this.$route.params.Id);
    },
    ...mapGetters(["getProductById", "getSizes"]),
  },
};
</script>

<style></style>
