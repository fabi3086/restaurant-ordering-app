import {menuArray} from './data.js'

const sectionMenu = document.getElementById('menu-iterate')
const sectionCheckout = document.getElementById('checkout')
const sectionPaymentItems = document.getElementById('payment') 
const sectionOrderCompleteState = document.getElementById('order-complete-state')
const ordersArray = []
let totalPrice = 0

document.addEventListener('DOMContentLoaded', function() {
    showMenuItems();
})

document.addEventListener('click', function(e){
    //check if clicked button is add-btn
    if(e.target.innerHTML == "+") {
        let itemName = e.target.getAttribute('data-menu')
        let itemPrice = e.target.getAttribute('data-price')
        let itemId = e.target.getAttribute('data-id')
        let newElement = {
            'name': itemName,
            'price': itemPrice,
            'id': itemId
        }
        //create ordersArray
        ordersArray.push(newElement)
        //update the total price
        totalPrice = totalPrice + parseInt(newElement.price)
        //show HTML element 
        sectionCheckout.style.visibility = 'visible'
        showUpdatedCart()
        //show total Price html element
        const checkoutItemPrice = document.getElementById('checkout-item-price')
        checkoutItemPrice.innerHTML = `${"$" + totalPrice}`
    }
    //check if clicked button is remove button
    else if(e.target.innerHTML == "remove") {
        //get position of element clicked in array
        const index = ordersArray.findIndex(item => item.id === 
        e.target.getAttribute('data-id'))
        ordersArray.splice(index, 1)
        //update cart with new ordersArray
        showUpdatedCart()
        //update totalPrice
        let price = parseInt(e.target.getAttribute('data-price'))
        totalPrice = totalPrice - price
        //show updated total Price html element
        const checkoutItemPrice = document.getElementById('checkout-item-price')
        checkoutItemPrice.innerHTML  = `${"$" + totalPrice}`
    }
})

function showMenuItems() {
    menuArray.forEach(menu => {
        // create menuItems and insert into section
        const menuItemDiv = document.createElement('div')
        menuItemDiv.innerHTML = `
                <div class="item">
                    <h1>${menu.name}</h1>
                    <p class="menu-img">${menu.emoji}</p>
                    <p>${menu.ingredients}</p>
                    <h2>${"$" + menu.price}</h2>
                    <button class="add-btn" id="add-btn-${menu.name}" data-menu="${menu.name}" data-price="${menu.price}" data-id="${menu.id}">+</button>
                        <div id="box-item">  
                        <div id="border-bottom"></div>
                        </div>
                </div>`
                
        sectionMenu.appendChild(menuItemDiv)
    })
}

function showUpdatedCart () {
    const checkoutItems = document.getElementById('checkout-items')
    checkoutItems.innerHTML = ""
    ordersArray.forEach(element => {
        // show element in HTML
        const menuCheckoutDiv = document.createElement('div');
        menuCheckoutDiv.innerHTML = `
                    <p class="item1">${element.name}</p>
                        <button class="remove-item-btn" id="remove-item-btn-${element.id}" 
                        data-id="${element.id}" data-name="${element.name}" data-price="${element.price}">remove</button>
                        <p class="item-price">${"$" + element.price}</p>`
        checkoutItems.appendChild(menuCheckoutDiv)
    })
}
// create an addEventListener for the complete order btn
const purchaseBtn = document.getElementById('purchase-btn')   
purchaseBtn.addEventListener('click', function(e) {
    sectionPaymentItems.style.visibility = 'visible'
})
//create an addEventListener for the payment order btn
const form = document.getElementById('payment-form')
form.addEventListener('submit', function(e) {
    sectionPaymentItems.style.visibility = "hidden"
    sectionCheckout.style.visibility = "hidden"
    sectionOrderCompleteState.style.visibility = "visible"
    e.preventDefault()
//create an access to the data from the array form 
    const data = new FormData(e.target);
    const dataArray = ([...data.entries()]);
    const h1Order = document.getElementById('order-complete-state-h1')
    h1Order.innerHTML = `Thanks, ${dataArray[0][1]} ! Your order is on its way`
})