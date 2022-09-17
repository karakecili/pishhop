import axios from "axios";

export const state = () => ({
  value: "dsd",
  value1: 23,
  products: [],
  productCategory: [],
});

export const getters = {
  getProductCategory(state) {
    return state.productCategory;
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
