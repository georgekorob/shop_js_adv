module.exports = {
    devServer: {
        proxy: 'http://localhost:3000',
        // headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     'Cache-Control': null,
        //     'X-Requested-With': null,
        //     'Content-Type': 'text/html'
        // }
    }
}