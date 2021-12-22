const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

function send(onError, onSuccess, url, method = 'GET', data = '', headers = {}, timeout = 60000) {

    let xhr;

    if (window.XMLHttpRequest) {
        // Chrome, Mozilla, Opera, Safari
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        // Internet Explorer
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    for ([key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value)
    }

    xhr.timeout = timeout;

    xhr.ontimeout = onError;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status < 400) {
                onSuccess(xhr.responseText)
            } else if (xhr.status >= 400) {
                onError(xhr.status)
            }
        }
    }

    xhr.open(method, url, true);

    xhr.send(data);
}

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
        return ++this.count;
    }

    remove() {
        return --this.count;
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

    _onSuccess(response) {
        // const data = JSON.parse(response);
        response.contents.forEach(product => {
            let goodStack = new GoodStack(new Good({
                id: product.id_product,
                title: product.product_name,
                price: product.price
            }));
            goodStack.count = product.quantity;
            this.list.push(goodStack);
        });
    }

    _onSuccessDelete(response) {
        // const data = JSON.parse(response)
        if (response.result === 1) {
            console.log('Товар удален!')
        }
    }

    // _onError(err) {
    //     console.log(err);
    // }

    getBasket() {
        return fetch(`${API_URL}getBasket.json`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this._onSuccess(response);
                return response;
            })
        // send(this._onError, this._onSuccess.bind(this), `${API_URL}getBasket.json`)
    }

    remove(id) {
        return fetch(`${API_URL}deleteFromBasket.json`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this._onSuccessDelete(response);
                return response;
            })
        // send(this._onError, this._onSuccessDelete.bind(this),
        //     `${API_URL}deleteFromBasket.json`,
        //     'GET',
        //     `{"id_product" : ${id}}`)
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
                new Good({id: product.id_product, title: product.product_name, price: product.price})
            )
        });
    }

    _onSuccessAdd(response) {
        // const data = JSON.parse(response);
        if (response.result === 1) {
            console.log('Товар добавлен!')
        }
    }

    // _onError(err) {
    //     console.log(err);
    // }

    fetchGoods() {
        return fetch(`${API_URL}catalogData.json`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this._onSuccess(response);
                return response;
            })
        // send(this._onError, this._onSuccess.bind(this), `${API_URL}catalogData.json`)
    }

    addToCart(id) {
        return fetch(`${API_URL}addToBasket.json`)
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                this._onSuccessAdd(response);
                return response;
            })
        // send(this._onError, this._onSuccessAdd.bind(this),
        //     `${API_URL}addToBasket.json`,
        //     'GET',
        //     `{"id_product" : ${id}, "quantity" : 1}`)
    }
}

const cart = new Cart();
const showcase = new Showcase(cart);

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

// Добавьте в соответствующие классы методы
// * добавления товара в корзину (addToBasket.json)
// * удаления товара из корзины (deleteFromBasket.json)
// * получения списка товаров корзины (getBasket.json)

const promise = showcase.fetchGoods();

promise.then(() => {
    showcase.addToCart(123);
    cart.remove(123);
    cart.getBasket();
    const renderShowcase = new RenderShowcase(showcase);
    renderShowcase.render();

    const renderCart = new RenderCart(showcase);

    document.querySelector('.cart-button').onclick = function () {
        renderCart.render();
    }

    document.querySelectorAll('.prod-button').forEach(button => button.onclick = function (event) {
        let prod_id = event.target.getAttribute('id_info');
        showcase.addToCart(prod_id);
    });
})
    .catch((err) => {
    console.log(err);
})
