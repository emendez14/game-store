'use strict';

const cart = [];
const cartDOM = document.querySelector('.cart');
const addToCartButtons = document.querySelectorAll('[data-action="ADD_TO_CART"]');

addToCartButtons.forEach((button)=>{
    button.addEventListener('click', ()=>{
        let itemDOM = button.parentNode;
        let item = {
            image: itemDOM.querySelector('img').getAttribute('src'),
            name: itemDOM.querySelector('.product-name').innerText,
            price: itemDOM.querySelector('.product-price').innerText,
            quantity: 1
        }

        cartDOM.insertAdjacentHTML('beforeend', `
            <div class="cart_item">
                <img class="cart_item_image" src="${item.image}">
                <h3 class="cart_item_name">${item.name}</h3>
                <h2 class="cart_item_price">${item.price}</h2>
                <h2 class="cart_item_quantity">${item.quantity}</h2>
                <button class="cart_add_btn" data-action="INCREASE">&plus;</button>
                <button class="cart_subtract_btn" data-action="DECREASE">&minus;</button>
                <button class="cart_remove_btn" data-action="REMOVE">&times;</button>
            </div>
        `);

        cart.push(item)
        
    })
})


