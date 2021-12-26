class RenderGoodShowcase {
    constructor(good) {
        this.good = good;
    }

    render() {
        return `<div class="goods-item">
                    <h3>${this.good.getTitle()}</h3>
                    <p>${this.good.getPrice()}</p>
                    <span class="hidden"></span>
                    <button class="prod-button" type="button" id_info="${this.good.getId()}">Добавить</button>
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

class RenderGoodCart {
    constructor(goodstack) {
        this.goodstack = goodstack;
    }

    render() {
        return `<div class="goods-item">
                    <h3>${this.goodstack.getTitle()}</h3>
                    <p>${this.goodstack.getCount()}</p>
                    <p>${this.goodstack.getPrice()}</p>
                    <button class="prod-del-button" type="button" id_info="${this.goodstack.getGoodId()}">Удалить</button>
                </div>`;
    }
}

class RenderCart extends RenderShowcase {
    render() {
        const $cart = document.querySelector('.cart');
        if ($cart) {
            $cart.remove();
        } else {
            const $main = document.querySelector('.main');
            let goodsList = this.renderGoodList(this.showcase.cart.list, RenderGoodCart);
            let cart_element = `<div class="cart container"><div class="cart-list">${goodsList}</div></div>`
            $main.insertAdjacentHTML('afterend', cart_element);

            document.querySelectorAll('.prod-del-button').forEach(button => button.onclick = function (event) {
                let prod_id = event.target.getAttribute('id_info');
                cart.remove(prod_id);
            });
        }
    }
}


// Создать для отрисовки классы:
// * карточки товара на ветрине
// * отрисовки ветрины
// * карточки товара в корзине
// * отрисовки корзины (отрисовать модальное окно)
