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
    return `
    <div class="js-sign-up-page">
        <form action="#" class="sign-up-form">
            <div class="container">
                <h1 class="sign-up-title-text">Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>
                <label for="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" required>
                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required>
                <label for="psw-repeat"><b>Repeat Password</b></label>
                <input type="password" placeholder="Repeat Password" name="psw-repeat" required>
                <label>
                    <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Remember me
                </label>
                <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p>
                <div class="clearfix">
                    <button type="button" class="cancelbtn">Cancel</button>
                    <button type="submit" class="signupbtn">Sign Up</button>
                </div>
            </div>
        </form>
    </div>
  `;
}

function generateAccountPage() {
    return `
    <div class="account-page">
        <div class="profile">
            <img src="#" />
        </div>
        <div class="account-info">
            <h1>Account Information</h1>
            <p>user name: </p>
            <p>email: </p>
            <p>live posts: </p>
        </div>
        <div class="user-posts">
            <ul>
                <li class="user-post"></li>
                <li class="user-post"></li>
            </ul>
        </div>
        <button> Make a new post!</button>
    </div>
    `;
}

function displayUserAccount() {
    //delete current view
    deleteView();
    renderView(generateAccountPage());
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
    $(".js-home-button").on("click", (event) => {
        deleteView();
        homePage();
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
    loginButton();
}

$(app);