import axios from "axios";

export const state = () => ({
  products: [],
  productCategory: [],
  sizes: [
    { id: "size-1", name: "Small", extention: "S" },
    { id: "size-2", name: "Medium", extention: "M" },
    { id: "size-3", name: "Large", extention: "L" },
    { id: "size-4", name: "X-Large", extention: "XL" },
    { id: "size-5", name: "XX-Large", extention: "XXL" },
  ],
});

export const getters = {
  getProductCategory(state) {
    return state.productCategory;
  },
  getProducts(state) {
    return state.products;
  },
  getProductById: (state) => (id) => {
    return state.products.find((e) => e.id == id);
  },
  getSizes(state) {
    return state.sizes;
  },
};

export const mutations = {
  setProductList(state, productList) {
    state.products = productList;
  },
  setProductCategoryList(state, productCategoryList) {
    state.productCategory = productCategoryList;
  },
};

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch("getProductList");
    await dispatch("getProductCategoryList");
  },
  async getProductList({ commit }) {
    try {
      const response = await axios.get(
        "https://ookprgdhd9.execute-api.us-west-2.amazonaws.com/ahmetfarukozturk9c12aae/products",
        ProductAPIconfig
      );
      commit("setProductList", response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async getProductCategoryList({ commit }) {
    try {
      const response = await axios.get(
        "https://ookprgdhd9.execute-api.us-west-2.amazonaws.com/ahmetfarukozturk9c12aae/products/categories",
        ProductAPIconfig
      );
      commit("setProductCategoryList", response.data);
    } catch (error) {
      console.log(error);
    }
  },
};

const ProductAPIconfig = {
  headers: {
    SHOP_SK: "6mcMzol0XEyQlIjUFnLyxtrLoIdiqjiS",
  },
};
