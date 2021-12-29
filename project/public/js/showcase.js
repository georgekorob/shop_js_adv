Vue.component('showcasecomp',
    {
        template: `
            <div class="goods-list row">
                <div class="goods-item col border rounded m-1" v-for="good of goodlist">
                    <h3>{{ good.title }}</h3>
                    <p>Цена: {{ good.price }}</p>
                    <button class="btn btn-warning" v-on:click="onClickAdd(good)" :data-id="good.id">Добавить</button>
                </div>
            </div>
        `,
        props: ['goodlist'],
        methods: {
            onClickAdd(good) {
                this.$emit('addtocart', good)
            }
        }
    }
)