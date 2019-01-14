"use strict";

// appends a view to the app
function renderView(view){
    $(".js-app-container").append(view);
}

function deleteView() {
    $(".js-app-container").empty();
}

function showHomePage() {
    $.ajax({
        url: '/for-sale',
        dataType: 'json',
        success: function(res) {
            res.items.forEach((item) => {
                renderView(itemList(item));
            });
        }
    });
}

// renders the home page takes data from api
function itemList(item){
    return `
        <div class="js-item item-container" id=${item['_id']}>
            <h1 class="item-title">${item.name}</h1>
            <img class="item-img-home" src="${item.image}" />
            <p class="item-desc">${item.shortDescription}</p>
        </div>`;    
}

function productDetailPage(item){
    return `
        <main role="main">
            <h1>${item.name}</h1>
            <p>$${item.price}</p>
            <img src="${item.image}" alt="${item.name}"/>
            <div class="item-description">
                <p>${item.description}</p>
            </div>
            <div class="seller-info">
                <h1>Contact Seller</h1>
                <p>Seller: ${1}</p>
                <p>email: </p>
                <p>phone: </p>
                <p>Location: </p>
            </div>
        </main>
    `;
}

function signupPage() {
    return `
    <div class="js-sign-up-page">
        <form action="#" class="sign-up-form">
            <div class="container">
                <h1 class="sign-up-title-text">Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>
                <label for="first-name"><b>First Name</b></label>
                <input type="text" placeholder="name" name="first-name" required>
                <label for="last-name"><b>Last Name</b></label>
                <input type="text" placeholder="last name" name="last-name" required>
                <label for="email"><b>Username</b></label>
                <input type="text" placeholder="Enter Email" name="email" required>
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
                    <button type="button" class="js-cancel-btn">Cancel</button>
                    
                </div>
            </div>
        </form>
        <button type="submit" class="js-signup-btn">Sign Up</button>
    </div>
  `;
}

function generateAccountPage() {
    return `
    <div class="account-page">
        <div class="profile">
            <img src="#"/>
        </div>
        <div class="account-info">
            <h1>Account Information</h1>
            <p>user name: </p>
            <p>email: </p>
            <p>live posts: </p>
        </div>
        <div class="user-posts">
            <ul class="user-posts"> 
            ${$.ajax({
                url: '/for-sale',
                sucess: function(res){
                    res.items.forEach((item) => {
                        $(".user-posts").append(`<li>${item.name}</li>`);
                    });
                }
            })}
                <li class="user-post"></li>
                <li class="user-post"></li>
            </ul>
        </div>
        <button class="js-make-a-post"> Make a new post!</button>
    </div>
    `;
}

function newPostPage() {
    return `
        <section class="post-layout">
            <form class="post-form">
                <label for="name">Name</label>
                <input class="text-input-form" id="name" type="text"/>
                <label for="price">Price</label>
                <input class="text-input-form" id="price" type="number"/>
                <label for="image">Image Url</label>
                <input class="text-input-form" id="image" type="text"/>
                <label for="shortDescription">Short Description</label>
                <input class="text-input-form" id="shortDescription" type="text"/>
                <label for="description">Description</label>
                <input class="text-input-form" id="description" type="text-area"/>
                <button class="js-post-item">Post for sale</button>
                <button>Cancel post</button>
            </form>
        </section>
    `;
}

function postItemForSale() {
    $(".js-app-container").on("click", ".js-post-item", (event) => {
        event.preventDefault();
        const itemToBePosted = {
            name: $("#name").val(),
            price: $("#price").val(),
            description: $("#description").val(),
            image: $("#image").val(),
            shortDescription: $("#shortDescription").val()
        }
        $.ajax({
            type:'POST',
            url: '/post-for-sale',
            data: itemToBePosted,
            success: function(newItem){
                console.log(newItem);
            }
        });
    });
}

function makeNewPost() {
    $(".js-app-container").on("click", ".js-make-a-post", (event) => {
        deleteView();
        renderView(newPostPage());
    });
}

function displayUserAccount() {
   $(".js-app-container").on("click", ".js-signup-btn", (event) => {
    console.log("wal-e"); 
    //delete current view
     deleteView();
     renderView(generateAccountPage());
   });
}

function loginToAccount() {
    $(".js-login-page").on("click", (event) => {
        console.log("hi");
        deleteView();
        renderView(signupPage);
    });
}

function goToHomePage(){
    // console.log("you say hi and i say..");
    $(".js-home-button").on("click", (event) => {
        deleteView();
        showHomePage();
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


function showItemDetails(){
    $(".js-app-container").on("click", ".js-item", (event) => {
        // deletes what is on current view
        deleteView();
        const itemId = ((event.target).closest("div").id);
        // console.log(itemId);
        $.ajax({
            url: `/for-sale/${itemId}`,
            success: function(res) {
                // console.log(res);
                renderView(productDetailPage(res));
            }
        });
    });
}
function app() {
    showHomePage();
    showItemDetails();
    goToHomePage();
    loginToAccount();
    displayUserAccount();
    makeNewPost();
    postItemForSale();
}

$(app);