Vue.component('cartcomp',
    {
        data() {
            return {
                cart: [],
                show: true,
            }
        },
        mounted() {
            this.$parent.getJson(`${API_URL}cart`)
                .then((data) => {
                    this.cart = data;
            })
        },
        methods: {
            deleteProductFromCart(id) {
                this.$parent.getJson(`${API_URL}cart`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id: id})
                }).then((response) => {
                    if (response.result === 1) {
                        this.cart = this.cart.filter(x => x.id !== id);
                        console.log('Товар удален!');
                    }
                })
            },
            addProductToCart(good) {
                this.$parent.getJson(`${API_URL}cart`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id: good.id})
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
        computed: {
            btnText: function() {
                if(this.show) {
                    return 'Закрыть корзину'
                }
                return 'Корзина'
            }
        },
        template: `
            <div class="cart-list row">
                <button class="btn btn-warning cart-button" @click="show = !show">{{ btnText }}</button>
                <div class="goods-item col border rounded m-1" v-for="good of cart" v-if="show">
                    <h3>{{ good.title }}</h3>
                    <p>Цена: {{ good.price }}</p>
                    <p>Количество: {{ good.quantity }}</p>
                    <button class="btn btn-danger" @click="deleteProductFromCart(good.id)" :data-id="good.id">Удалить</button>
                </div>
            </div>
        `
    }
)