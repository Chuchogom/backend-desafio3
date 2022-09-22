const express = require('express');
const app = express();
const Container = require('./index');
const products = new Container("products.txt");
const PORT = process.env.PORT || 8080;

/*--- Products ---*/
let product1 = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  thumbnail: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
};

let product2 = {
  id: 2,
  title: "Mens Casual Premium Slim Fit T-Shirts ",
  price: 22.3,
  image:
    "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
};

let product3 = {
  id: 3,
  title: "Mens Cotton Jacket",
  price: 55.99,
  image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
};

/* --- Send products --- */
const useContainer = async () => {
  await products.save(product1);
  await products.save(product2);
  await products.save(product3);
};

useContainer();

const getProduct = async ()=>{
    let listProduct = JSON.stringify(await products.getAll());
    return listProduct;
}
const productRandom = async () =>{
    let length = await products.listLength()
    let random = Math.floor(Math.random() * length)
    let productRandom = await products.getAll();
    console.log(length, random, productRandom)
    return JSON.stringify(productRandom[random]);
}

/* --- Server --- */
app.get('/', (req,res) => {
    res.send('<h1>Home</h1>')
})

app.get('/products',async (req, res) => {
    res.send(`Product List: ${await getProduct()}`);
})

app.get('/productRandom',async (req, res) => {
    res.send(`The random porduct is: ${await productRandom()}`);
})

const server = app.listen(PORT,()=>{console.log('Server Runing on port:', PORT)});
server.on('error',error=>console.log(`error ${error}`));