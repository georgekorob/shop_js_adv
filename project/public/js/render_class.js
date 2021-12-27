class RenderGoodShowcase {
    constructor(good) {
        this.good = good;
    }

    render() {
        return `<div class="goods-item col border rounded m-1">
                    <h3>${this.good.getTitle()}</h3>
                    <p>Цена: ${this.good.getPrice()}</p>
                    <span class="hidden"></span>
                    <button class="prod-button btn btn-warning" type="button" id_info="${this.good.getId()}">Добавить</button>
                </div>`;
    }
}

class RenderGoodCart {
    constructor(goodstack) {
        this.goodstack = goodstack;
    }

    render() {
        return `<div class="goods-item col border rounded m-1">
                    <h3>${this.goodstack.getTitle()}</h3>
                    <p>Количество: ${this.goodstack.getCount()}</p>
                    <p>Цена: ${this.goodstack.getPrice()}</p>
                    <button class="prod-del-button btn btn-danger" type="button" id_info="${this.goodstack.getGoodId()}">Удалить</button>
                </div>`;
    }
}

class RenderShowcase {
    constructor(showcase) {
        this.showcase = showcase;
    }

    renderGoodList(lst, goodRenderClass) {
        return lst.map(
            (good) => {
                const renderGood = new goodRenderClass(good);
                return renderGood.render();
            }
        ).join('');
    }

    render() {
        const $goodsList = document.querySelector('.goods-list');
        let goodsList = this.renderGoodList(this.showcase.list, RenderGoodShowcase)
        $goodsList.insertAdjacentHTML('beforeend', goodsList);
    }
}

class RenderCart extends RenderShowcase {
    create_elems_render() {
        let goodsList = this.renderGoodList(this.showcase.cart.list, RenderGoodCart);
        const $main = document.querySelector('.main');
        let cart_element = `<div class="container cart"><div class="cart-list">${goodsList}</div></div>`
        $main.insertAdjacentHTML('afterend', cart_element);

        document.querySelectorAll('.prod-del-button').forEach(button => button.onclick = (event) => {
            let prod_id = parseInt(event.target.getAttribute('id_info'));
            this.showcase.cart.remove(prod_id)
                .then((response) => {
                    const $cart = document.querySelector('.cart');
                    if ($cart) {
                        $cart.remove();
                    }
                    this.create_elems_render();
                })
        });
    }

    render() {
        const $cart = document.querySelector('.cart');
        if ($cart) {
            $cart.remove();
            this.showcase.cart.list = [];
        } else {
            this.showcase.cart.getBasket()
                .then((response) => {
                    this.create_elems_render();
                    return response;
                });
        }
    }
}


// Создать для отрисовки классы:
// * карточки товара на ветрине
// * отрисовки ветрины
// * карточки товара в корзине
// * отрисовки корзины (отрисовать модальное окно)
