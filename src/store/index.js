import {createStore} from 'vuex'

const API_URL = 'http://localhost:3000/api/v1/';
function getJson(url, params = {}) {
    return fetch(API_URL + url, params)
        .then(result => result.json())
        .catch(error => {
            console.log(error);
        })
}

export default createStore({
    state: {
        showcase: [],
        cart: [],
        searchString: '',
    },
    getters: {
        getCart: (state) => [...state.cart], // state.cart.slice()
        getShowcase: state => state.showcase.filter(product =>
            new RegExp(state.searchString, 'i').test(product.title)),
        getSearchString: state => state.searchString,
    },
    mutations: {
        setShowcase: (state, payload) => state.showcase = payload,
        addToCart: (state, payload) => {
            let index_prod = state.cart.findIndex(x => x.id === payload.id);
            if (index_prod !== -1) {
                state.cart[index_prod].quantity++;
            } else {
                payload['quantity'] = 1;
                state.cart.push(payload);
            }
        },
        removeFromCart: (state, id) => {
            state.cart = state.cart.filter(product => product.id !== id)
        },
        setSearchString: (state, payload) => state.searchString = payload,
    },
    actions: {
        loadShowcase({commit}) {
            getJson(`showcase`)
                .then((data) => {
                    commit('setShowcase', data);
                })
        },
        loadCart({commit}) {
            getJson(`cart`)
                .then((data) => {
                    data.forEach(
                        product => commit('addToCart', product)
                    )
                })
        },
        addProductToCart({commit}, good) {
            getJson(`cart`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: good.id})
            }).then((response) => {
                if (response.result === 1) {
                    commit('addToCart', good);
                    console.log('Товар добавлен!');
                }
            })
        },
        deleteProductFromCart({commit}, id) {
            getJson(`cart`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: id})
            }).then((response) => {
                if (response.result === 1) {
                    commit('removeFromCart', id);
                    console.log('Товар удален!');
                }
            })
        },
    },
    modules: {}
})
