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
  cart: [],
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
  getCart(state) {
    return state.cart.map((item) => {
      return {
        ...item,
        total: state.products.find((x) => x.id === item.id).price * item.amount,
      };
    });
  },
  getSizeById: (state) => (extention) => {
    return state.sizes.find((e) => e.extention == extention);
  },
  getCartById: (state) => (id, size) => {
    return state.cart.find((e) => e.id == id && e.size == size);
  },
};

export const mutations = {
  setProductList(state, productList) {
    state.products = productList;
  },
  setProductCategoryList(state, productCategoryList) {
    state.productCategory = productCategoryList;
  },
  addToCart(state, product) {
    let value = state.cart.find(
      (e) => e.id === product.id && e.size === product.size
    );
    if (value) {
      if (value.amount == 1 && product.amount == -1) {
        state.cart.splice(state.cart.indexOf(value), 1);
      } else {
        value.amount += product.amount;
      }
    } else {
      state.cart.push(product);
    }
  },
  removeFromCart(state, product) {
    let value = state.cart.find(
      (e) => e.id === product.id && e.size === product.size
    );
    state.cart.splice(state.cart.indexOf(value), 1);
  },
  addToCartDB(state, product) {
    state.cart.push(product);
  },
  removeAllFromCart(state) {
    state.cart = [];
  },
  removeFromCartDB(state, key) {
    let value = state.cart.find((e) => e.key === key);
    state.cart.splice(state.cart.indexOf(value), 1);
  },
};

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch("getProductList");
    await dispatch("getProductCategoryList");
    await dispatch("getFromCartDB");
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
  addToCart({ commit }, payload) {
    commit("addToCart", payload);
  },
  async addToCartDB({ dispatch }, payload) {
    try {
      await axios.post("cart.json", payload, fireBaseconfig);
      dispatch("getFromCartDB");
    } catch (error) {
      console.log(error);
    }
  },
  async updateToCartDB({ dispatch }, payload) {
    try {
      await axios.put(
        "cart/" + payload.key + ".json",
        payload.data,
        fireBaseconfig
      );
      dispatch("getFromCartDB");
    } catch (error) {
      console.log(error);
    }
  },
  async getFromCartDB({ commit }) {
    try {
      commit("removeAllFromCart");
      const response = await axios.get("cart.json", fireBaseconfig);

      let data = response.data;
      for (let key in data) {
        data[key].key = key;
        commit("addToCartDB", data[key]);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async removeFromCartDB({ commit }, key) {
    try {
      await axios.delete("cart/" + key + ".json", fireBaseconfig);
      commit("removeFromCartDB", key);
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

const fireBaseconfig = {
  baseURL:
    "https://pishop-nuxt-default-rtdb.europe-west1.firebasedatabase.app/",
  headers: {
    Accepts: "application/json",
  },
};
