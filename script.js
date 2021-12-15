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
            new Good({id: 4, title: 'Носки', price: 50}),
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


console.log(showcase, cart);

// Создать для отрисовки классы:
// * карточки товара на ветрине
// * карточки товара в корзине
// * отрисовки ветрины
// * отрисовки корзины (отрисовать модальное окно)

