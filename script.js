function getCounter() {
    let last = 0;

    return () => ++last;
}

const stackIDGenerator = getCounter()


class Good {
    constructor({id, title, price}) {
        this.id = id;
        this.title = title;
        this.price = price;
    }

    getId() {
        return this.id;
    }

    getPrice() {
        return this.price;
    }

    getTitle() {
        return this.title;
    }
}

class GoodStack {
    constructor(good) {
        this.id = stackIDGenerator();
        this.good = good;
        this.count = 1;
    }

    getGoodId() {
        return this.good.getId()
    }

    getGood() {
        return this.good;
    }

    getTitle() {
        return this.good.getTitle();
    }

    getCount() {
        return this.count;
    }

    getPrice() {
        return this.good.getPrice() * this.count;
    }

    add() {
        this.count++;
        return this.count;
    }

    remove() {
        this.count--;
        return this.count;
    }
}

class Cart {
    constructor() {
        this.list = []
    }

    add(good) {
        const idx = this.list.findIndex((stack) => stack.getGoodId() === good.getId())

        if (idx >= 0) {
            this.list[idx].add()
        } else {
            this.list.push(new GoodStack(good))
        }

    }

    remove(id) {
        const idx = this.list.findIndex((stack) => stack.getGoodId() === id)

        if (idx >= 0) {
            this.list[idx].remove()

            if (this.list[idx].getCount() <= 0) {
                this.list.splice(idx, 1)
            }
        }

    }
}

class Showcase {
    constructor(cart) {
        this.list = [];
        this.cart = cart;
    }

    fetchGoods() {
        this.list = [
            new Good({id: 1, title: 'Футболка', price: 140}),
            new Good({id: 2, title: 'Брюки', price: 320}),
            new Good({id: 3, title: 'Галстук', price: 24}),
            new Good({id: 5, title: 'Ботинки', price: 250}),
        ]
    }

    addToCart(id) {
        const idx = this.list.findIndex((good) => id === good.getId())

        if (idx >= 0) {
            this.cart.add(this.list[idx])
        }
    }
}

const cart = new Cart();
const showcase = new Showcase(cart);

showcase.fetchGoods();

showcase.addToCart(1);
showcase.addToCart(1);
showcase.addToCart(1);
showcase.addToCart(3);

cart.remove(1);

// Создать для отрисовки классы:
// * карточки товара на ветрине
// * отрисовки ветрины
// * карточки товара в корзине
// * отрисовки корзины (отрисовать модальное окно)

class RenderGoodShowcase {
    constructor(good) {
        this.good = good;
    }

    render() {
        return `<div class="goods-item"><h3>${this.good.getTitle()}</h3><p>${this.good.getPrice()}</p></div>`;
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

const renderShowcase = new RenderShowcase(showcase);
renderShowcase.render();

class RenderGoodCart {
    constructor(goodstack) {
        this.goodstack = goodstack;
    }

    render() {
        return `<div class="goods-item"><h3>${this.goodstack.getTitle()}</h3><p>${this.goodstack.getCount()}</p><p>${this.goodstack.getPrice()}</p></div>`;
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
        }
    }
}

const renderCart = new RenderCart(showcase);

document.querySelector('.cart-button').onclick = function () {
    renderCart.render();
}
