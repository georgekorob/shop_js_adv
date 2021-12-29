const API_URL = 'http://localhost:3000/api/v1/';

// Переделать на Vue
// Кнопка корзина
// Кнопка закрыть корзину
// Кнопка купить
// Кнопка удалить

new Vue({
    el: '#app',
    data: {
        showcase: [],
        cart: [],
        isCartVisible: true
    },
    methods: {
        onCartVisible() {
            this.isCartVisible = !this.isCartVisible;
        },
        deleteProductFromCart(id) {
            fetch(`${API_URL}cart`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: id})
            }).then((response) => {
                return response.json();
            }).then((response) => {
                if (response.result === 1) {
                    this.cart = this.cart.filter(x => x.id !== id);
                    console.log('Товар удален!');
                }
            })
        },
        addProductToCart(good) {
            fetch(`${API_URL}cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: good.id})
            }).then((response) => {
                return response.json();
            }).then((response) => {
                if (response.result === 1) {
                    let index_prod = this.cart.findIndex(x => x.id === good.id);
                    if (index_prod !== -1) {
                        this.cart[index_prod].quantity++;
                    } else {
                        Vue.set(good, 'quantity', 1);
                        this.cart.push(good);
                    }
                    console.log('Товар добавлен!');
                }
            })
        }
    },
    mounted() {
        fetch(`${API_URL}showcase`)
            .then((response) => {
                return response.json();
            }).then((data) => {
            this.showcase = data;
        })
        fetch(`${API_URL}cart`)
            .then((response) => {
                return response.json();
            }).then((data) => {
            this.cart = data;
        })
    }

})
