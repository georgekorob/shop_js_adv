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
        this.list = [];
        response.forEach(product => {
            let goodStack = new GoodStack(new Good({
                id: product.id,
                title: product.title,
                price: product.price
            }));
            goodStack.count = product.quantity;
            this.list.push(goodStack);
        });
        return response;
    }

    _onSuccessDelete(response, id) {
        if (response.result === 1) {
            console.log('Товар удален!');
            this.list = this.list.filter(x => x.getGoodId() !== id);
        }
        return response;
    }

    getBasket() {
        return fetch(`${API_URL}api/v1/cart`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                return this._onSuccess(response);
            })
    }

    remove(id) {
        return fetch(`${API_URL}api/v1/cart`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: id})
        }).then((response) => {
            return response.json();
        }).then((response) => {
            return this._onSuccessDelete(response, id);
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
            console.log('Товар добавлен!');
        }
        return response;
    }

    fetchGoods() {
        return fetch(`${API_URL}api/v1/showcase`)
            .then((response) => {
                return response.json();
            }).then((response) => {
                this._onSuccess(response);
                return response;
            })
    }

    addToCart(id) {
        return fetch(`${API_URL}api/v1/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: id})
        }).then((response) => {
            return response.json();
        }).then((response) => {
            return this._onSuccessAdd(response);
        })
    }
}


// 1. Добавить роут для обработки запроса на удаление товара из корзины
// 2. Подключить проект к серверной части
// 3. *Переписать обработчики роутов с использованием промисов
