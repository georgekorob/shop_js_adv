Vue.component('cartcomp',
    {
        template: `
            <div class="cart-list row">
                <button class="btn btn-warning cart-button" v-on:click="onClickClose">Закрыть корзину</button>
                <div class="goods-item col border rounded m-1" v-for="good of goodlist">
                    <h3>{{ good.title }}</h3>
                    <p>Цена: {{ good.price }}</p>
                    <p>Количество: {{ good.quantity }}</p>
                    <button class="btn btn-danger" v-on:click="onClickDelete(good.id)" :data-id="good.id">Удалить</button>
                </div>
            </div>
        `,
        props: ['goodlist'],
        methods: {
            onClickClose() {
                this.$emit('cartclose')
            },
            onClickDelete(id) {
                this.$emit('deletefromcart', id)
            }
        }
    }
)