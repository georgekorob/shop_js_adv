Vue.component('showcasecomp',
    {
        data() {
            return {
                showcase: [],
                filtered: [],
            }
        },
        methods: {
            filter(phrase){
                let regexp = new RegExp(phrase, 'i');
                this.filtered = this.showcase.filter(el => regexp.test(el.title));
            },
        },
        mounted() {
            this.$parent.getJson(`${API_URL}showcase`)
                .then((data) => {
                this.showcase = data;
                this.filtered = data.slice();
            })
        },
        template: `
            <div class="goods-list row">
                <div class="goods-item col border rounded m-1" v-for="good of filtered">
                    <h3>{{ good.title }}</h3>
                    <p>Цена: {{ good.price }}</p>
                    <button class="btn btn-warning" @click="$root.$refs.cart.addProductToCart(good)" :data-id="good.id">
                        Добавить
                    </button>
                </div>
            </div>
        `
    }
)