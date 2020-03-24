'use strict';



let cart = (JSON.parse(localStorage.getItem('cart')) || []);
const cartDOM = document.querySelector('.cart');
const addToCartButtons = document.querySelectorAll('[data-action="ADD_TO_CART"]');

if(cart.length > 0){
    cart.forEach((cartitem)=>{
        let item = cartitem;
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

        addToCartButtons.forEach((button)=>{
            const itemDOM = button.parentNode;

            if(itemDOM.querySelector('.product-name').innerText === item.name){
                const cartItemsDOM = cartDOM.querySelectorAll('.cart_item');
                button.disabled = 'true';
                cartItemsDOM.forEach((cartItemDOM)=>{
                    if(cartItemDOM.querySelector('.cart_item_name').innerText === item.name){
                        cartItemDOM.querySelector('[data-action="INCREASE"]').addEventListener('click', ()=>{
                            cart.forEach((cartItem)=>{
                                if(cartItem.name === item.name){
                                    cartItemDOM.querySelector('.cart_item_quantity').innerText = ++cartItem.quantity;
                                    localStorage.setItem('cart', JSON.stringify(cart));
                                }
                            });
                        });

                        cartItemDOM.querySelector('[data-action="DECREASE"]').addEventListener('click', ()=>{
                            cart.forEach((cartItem)=>{
                                if(cartItem.name === item.name){
                                    if(cartItem.quantity > 1){
                                        cartItemDOM.querySelector('.cart_item_quantity').innerText = --cartItem.quantity;
                                    } else {
                                        setTimeout(() => cartItemDOM.remove(), 500)
                                        cart = cart.filter(cartItem => cartItem.name !== item.name);
                                        localStorage.setItem('cart', JSON.stringify(cart));
                                        button.disabled = false;
                                    }
                                }
                            });
                        });

                        cartItemDOM.querySelector('[data-action="REMOVE"]').addEventListener('click', ()=>{
                            cart.forEach((cartItem)=>{
                                if(cartItem.name === item.name){
                                        cartItemDOM.remove()
                                        cart = cart.filter(cartItem => cartItem.name !== item.name);
                                        localStorage.setItem('cart', JSON.stringify(cart));
                                        button.disabled = false;
                                }
                            });
                        });
                        
                    }
                });
            }
        })
    })
}

addToCartButtons.forEach((button)=>{
    button.addEventListener('click', ()=>{
        let itemDOM = button.parentNode;
        let item = {
            image: itemDOM.querySelector('img').getAttribute('src'),
            name: itemDOM.querySelector('.product-name').innerText,
            price: itemDOM.querySelector('.product-price').innerText,
            quantity: 1
        }
        
        const isInCart = cart.filter(cartitem => cartitem.name === item.name).length > 0;
        if(isInCart === false){
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

        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        button.disabled = true;
        }
        
        const cartItemsDOM = cartDOM.querySelectorAll('.cart_item');
        cartItemsDOM.forEach((cartItemDOM)=>{
            if(cartItemDOM.querySelector('.cart_item_name').innerText === item.name){
                cartItemDOM.querySelector('[data-action="INCREASE"]').addEventListener('click', ()=>{
                    cart.forEach((cartItem)=>{
                        if(cartItem.name === item.name){
                            cartItemDOM.querySelector('.cart_item_quantity').innerText = ++cartItem.quantity;
                            localStorage.setItem('cart', JSON.stringify(cart));
                        }
                    });
                });

                cartItemDOM.querySelector('[data-action="DECREASE"]').addEventListener('click', ()=>{
                    cart.forEach((cartItem)=>{
                        if(cartItem.name === item.name){
                            if(cartItem.quantity > 1){
                                cartItemDOM.querySelector('.cart_item_quantity').innerText = --cartItem.quantity;
                            } else {
                                setTimeout(() => cartItemDOM.remove(), 500)
                                cart = cart.filter(cartItem => cartItem.name !== item.name);
                                localStorage.setItem('cart', JSON.stringify(cart));
                                button.disabled = false;
                            }
                        }
                    });
                });

                cartItemDOM.querySelector('[data-action="REMOVE"]').addEventListener('click', ()=>{
                    cart.forEach((cartItem)=>{
                        if(cartItem.name === item.name){
                                cartItemDOM.remove()
                                cart = cart.filter(cartItem => cartItem.name !== item.name);
                                localStorage.setItem('cart', JSON.stringify(cart));
                                button.disabled = false;
                        }
                    });
                });
                
            }
        });

    });
});


