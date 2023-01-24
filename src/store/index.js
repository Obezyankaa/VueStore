import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/Data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [{ productId: 1, amount: 1 }],
  },
  mutations: {
    addProductToCart(state, payload) {
      const item = state.cartProducts.find((el) => el.productId === payload.productId);

      if (item) {
        item.amount += payload.amount;
      } else {
        state.cartProducts.push({
          productId: payload.productId,
          amount: payload.amount,
        });
      }
    },
  },
  getters: {
    cartDetailroduct(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((el) => el.id === item.productId),
      }));
    },
    catrTotalPrice(state, getters) {
      return getters.cartDetailroduct.reduce((acc, el) => (el.product.price * el.amount) + acc, 0);
    },
    counterPrice(state, getters) {
      return getters.cartDetailroduct.length;
    },
  },

});
