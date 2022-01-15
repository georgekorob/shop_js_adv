const API_URL = 'http://localhost:3000/api/v1/';

// 1. Вынести поиск в отдельный компонент.
// 2. Вынести корзину в отдельный компонент.
// 3. *Создать компонент с сообщением об ошибке. Компонент должен отображаться, когда не удаётся выполнить запрос к серверу.

new Vue({
    el: '#app',
    methods: {
        getJson(url, params = {}) {
            return fetch(url, params)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
    },
    mounted() {
        console.log('root', this);
    }

})
