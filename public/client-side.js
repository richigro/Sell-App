"use strict";

const MOCK_ITEMS_ON_SALE = {
    "itemsOnSale": [
        {
            "id": "1111111",
            "title": "Sewing Machine",
            "price": "100",
            "description": "This is a really good sewing machine",
            "contact": {
                "phone": "+210123578",
                "email": "asdf@asdf.com"
            }, 
            "publishedAt": 1470016976609
        }, 
        {
            "id": "1111112",
            "title": "Computer",
            "price": "700",
            "description": "description fir second item",
            "contact": {
                "phone": "+210123578",
                "email": "asdf@asdf.com"
            }, 
            "publishedAt": 1470016976609
        },
        {
            "id": "1111113",
            "title": "Cellphone",
            "price": "400",
            "description": "description for third item",
            "contact": {
                "phone": "+210123578",
                "email": "asdf@asdf.com"
            }, 
            "publishedAt": 1470016976609
        }
    ]
};
// appends a view to the app
function renderView(view){
    $(".js-app-container").append(view);
}

function deleteView() {
    $(".js-app-container").empty();
}

function homePage() {
    MOCK_ITEMS_ON_SALE.itemsOnSale.forEach((item) => {
        renderView(itemList(item));
    });
}

// renders the home page takes data from api
function itemList(item){
    return `
        <div class="js-item item-container" id=${item.id}>
            <h1 class="item-title">${item.title}</h1>
            <img class="item-img-home" src="https://i03.hsncdn.com/is/image/HomeShoppingNetwork/prodgrid230/janome-15-stitch-color-me-sewing-machine-standard-d-2018012314022664~597747_RNR.jpg" />
            <p class="item-desc">${item.description}</p>
        </div>`;    
}

function productDetailPage(item){
    return `
        <main role="main">
            <h1>${item.title}</h1>
            <img src="#"/>
            <div class="item-description">
                <p>${item.description}</p>
            </div>
            <div class="seller-info">
                <h1>Contact Seller</h1>
                <p>email: ${item.contact["email"]}</p>
                <p>phone: ${item.contact["phone"]}</p>
                <p>Location:</p>
            </div>
        </main>
    `;
}

function loginPage() {
    return `<h1>Login Page coming soon..</h1>`;
}

function loginButton() {
    $(".js-login-page").on("click", (event) => {
        console.log("hi");
        deleteView();
        renderView(loginPage());
    });
}

function homeButton(){
    
    // console.log("you say hi and i say..");
    $(".js-app-container").on("click", ".js-home-button", (event) => {
        console.log("Hello");
        // deleteView();
        // homePage();
    });
}

function findItemById(itemList, itemId) {
    let foundItem = {};
    itemList.forEach((item) => {
        for(let keyId in item) {
            if(item[keyId] === itemId) {
                foundItem = item;
            }
        }
    });
    return foundItem;
}


function showItemDetail(){
    $(".js-app-container").on("click", ".js-item", (event) => {
        // deletes what is on current view
        deleteView();
        const itemId = ((event.target).closest("div").id).toString();
        // console.log(typeof itemId);
        const allItems = MOCK_ITEMS_ON_SALE.itemsOnSale;
        // console.log(allItems);
        const selectedItem = findItemById(allItems, itemId); 
        // loads new view
        renderView(productDetailPage(selectedItem));
    });
}
function app() {
    // renders home page few items for sale
    homePage();
    showItemDetail();
    homeButton();
}

$(app());