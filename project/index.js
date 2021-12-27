const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

const port = 3000
const catalog_path = path.resolve(__dirname, './data/showcase.json')
const cart_path = path.resolve(__dirname, './data/cart.json')
const static_dir = path.resolve(__dirname, './public/')

app.use(express.json())
app.use(express.static(static_dir))

app.get('/api/v1/showcase', (req, res) => {
    fs.readFile(catalog_path, 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(data);
        }
    })
})

app.route('/api/v1/cart')
    .get((req, res) => {
        fs.readFile(cart_path, 'utf-8', (err, data) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.send(data);
            }
        })
    })
    .post((req, res) => {
        fs.readFile(catalog_path, 'utf-8', (err, data) => {
            if (err) {
                res.status(500).send(err)
            } else {
                const catalog = JSON.parse(data);
                fs.readFile(cart_path, 'utf-8', (err, data) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        //let id = parseInt(req.body.id);
                        let id = req.body.id;
                        console.log('add', id)
                        const cart = JSON.parse(data);
                        let prod = catalog.find(x => x.id === id);
                        if (prod) {
                            let find = cart.find(x => x.id === prod.id);
                            if (find) {
                                find.quantity++;
                            } else {
                                prod.quantity = 1;
                                cart.push(prod);
                            }
                            fs.writeFile(cart_path, JSON.stringify(cart), 'utf-8', (err, data) => {
                                res.send({result: 1});
                            })
                        } else {
                            res.sendStatus(404);
                        }
                    }
                })
            }
        })
    })
    .delete((req, res) => {
        fs.readFile(cart_path, 'utf-8', (err, data) => {
            if (err) {
                res.status(500).send(err)
            } else {
                // let id = parseInt(req.body.id);
                let id = req.body.id;
                console.log('delete', id)
                const cart = JSON.parse(data).filter(x => x.id !== id);
                fs.writeFile(cart_path, JSON.stringify(cart), 'utf-8', (err, data) => {
                    res.send({result: 1});
                })
            }
        })
    })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

