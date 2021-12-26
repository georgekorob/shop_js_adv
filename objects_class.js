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

    getId = () => this.id;
    getPrice = () => this.price;
    getTitle = () => this.title;
}

class GoodStack {
    constructor(good) {
        this.id = stackIDGenerator();
        this.good = good;
        this.count = 1;
    }

    getGoodId = () => this.good.getId();
    getGood = () => this.good;
    getTitle = () => this.good.getTitle();
    getCount = () => this.count;
    getPrice = () => this.good.getPrice() * this.count;
    add = () => ++this.count;
    remove = () => --this.count;
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

    _onSuccess(response) {
        response.contents.forEach(product => {
            let goodStack = new GoodStack(new Good({
                id: product.id,
                title: product.title,
                price: product.price
            }));
            goodStack.count = product.quantity;
            this.list.push(goodStack);
        });
    }

    _onSuccessDelete(response) {
        if (response.result === 1) {
            console.log('Товар удален!')
        }
    }

    getBasket() {
        return fetch(`${API_URL}api/v1/cart`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this._onSuccess(response);
                return response;
            })
    }

    remove(id) {
        return fetch(`${API_URL}api/v1/cart`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this._onSuccessDelete(response);
                return response;
            })
    }
}

class Showcase {
    constructor(cart) {
        this.list = [];
        this.cart = cart;
    }

    _onSuccess(response) {
        response.forEach(product => {
            this.list.push(
                new Good({id: product.id, title: product.title, price: product.price})
            )
        });
    }

    _onSuccessAdd(response) {
        if (response.result === 1) {
            console.log('Товар добавлен!')
        }
    }

    fetchGoods() {
        return fetch(`${API_URL}api/v1/showcase`, {mode: 'no-cors'})
            // return fetch(`${API_URL}catalogData.json`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this._onSuccess(response);
                return response;
            })
    }

    addToCart(id) {
        return fetch(`${API_URL}api/v1/cart`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this._onSuccessAdd(response);
                return response;
            })
    }
}


// 1. Добавить роут для обработки запроса на удаление товара из корзины
// 2. Подключить проект к серверной части
// 3. *Переписать обработчики роутов с использованием промисов
