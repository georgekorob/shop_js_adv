const API_URL = 'http://localhost:3000/';
// const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

const cart = new Cart();
const showcase = new Showcase(cart);

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

    document.querySelectorAll('.prod-button')
        .forEach(button => button.onclick = function (event) {
            let prod_id = event.target.getAttribute('id_info');
            showcase.addToCart(prod_id);
        });
})
    .catch((err) => {
        console.log(err);
    })
