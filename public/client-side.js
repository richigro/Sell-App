"use strict";

const ITEMS_URL = '/items';
const USERS_URL = '/users';

// appends a view to the app
function renderView(view){
    $(".js-app-container").html(view);
}

function deleteCurrentView() {
    $(".js-app-container").empty();
}

function getAllItemsForSale() {
    // clear all previosly saved token in window storage 
    // user must login again if page is refreshed
    //optional feature, since session not included
    // localStorage.clear();
    
    $.ajax({
        url: ITEMS_URL,
        dataType: 'json',
        success: function(res) {
            $(".js-app-container").html("<div class='js-items-container'> </div>");
            res.items.forEach((item) => {
                $(".js-items-container").append(itemContainer(item));
            });
        },
        error: function(err) {
            console.log(err, 'no items could be retrived from db');
        }
    });
}

function convertNumberMonthToStringMonth(numberMonth) {
    let month;
    switch (numberMonth) {
        case 0:
          month = "Jan";
          break;
        case 1:
          month = "Feb";
          break;
        case 2:
           month = "Mar";
          break;
        case 3:
          month = "Apr";
          break;
        case 4:
          month = "May";
          break;
        case 5:
          month = "June";
          break;
        case 6:
          month = "July";
          break;
        case 7: 
          month = "Aug";
          break;
        case 8:
          month = "Sep";
          break;
        case 9:
          month = "Oct";
          break;
        case 10:
          month = "Nov";
          break;
        case 11:
          month = "Dec";
          break;           
      }
      return month;
}



function normalizeIsoDate(isoDate) {
    const numberMonth = new Date(isoDate).getMonth();
    const stringMonth = convertNumberMonthToStringMonth(numberMonth);
    const dayPosted = new Date(isoDate).getDate();
    return `${stringMonth} ${dayPosted} -`;
}


// renders the home page takes data from get enpoint
function itemContainer(item){
    return `
        <div class="js-item item-container" id=${item['_id']}>
            <div class="item-price-home">$${item.price}</div>
            <img class="item-image-home" src="${item.image}" />
            <div class="item-info-home">${normalizeIsoDate(item.publishedOn)} ${item.name}</div>
        </div>`;    
}

function showProductDetails(item){
    return `
        <div class="detailed-item-container">
            <h1 class="detail-item-name">${item.name}</h1>
            <p class="detail-item-price">$${item.price}</p>
            <img class="item-detail-img" src="${item.image}" alt="${item.name}"/>
            <div class="item-detail-description">
                <p>${item.description}</p>
            </div>
            <div class="seller-info">
                <h1 class="detail-item-seller-title">Contact Seller</h1>
                <p class="detail-item-seller-username">Seller: ${item.seller.username}</p>
                <p class="detail-item-seller-email">Email: ${item.seller.email}</p>
            </div>
        </div>
    `;
}

function signupForm() {
    return `
    <div class="js-sign-up-page">
        <form action="#" class="sign-up-form">
                <h1 class="sign-up-title-text">Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
                <hr>
                <label for="first-name"><b>First Name</b></label>
                <input class="js-firstName" type="text" placeholder="name" name="first-name" required>
                <label for="last-name"><b>Last Name</b></label>
                <input class="js-lastName" type="text" placeholder="last name" name="last-name" required>
                <label for="username"><b>Username</b></label>
                <input class="js-username" type="text" placeholder="Choose a username" name="username" required>
                <label for="email"><b>Email</b></label>
                <input class="js-email" type="text" placeholder="Enter Email" name="email" required>
                <label for="password"><b>Password</b></label>
                <input class="js-password" type="password" placeholder="Enter Password" name="password" required>
                <label for="password-repeat"><b>Repeat Password</b></label>
                <input class="js-repeated-password" type="password" placeholder="Repeat Password" name="password-repeat" required>
                <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p>
                <button type="button" class="js-create-user-btn">create user</button>
        </form>
        <div class="clearfix">
            <p>Do you already have an Account? Login here</p>
            <button type="submit" class="js-login-btn login-btn">Log in</button>    
        </div>
    </div>
  `;
}

function loginForm() {
    return `
    <div class="js-signup login-page">
        <form class="login-form">
            <h1 class="sign-up-title-text">Login</h1>
            <label for="username"><b>Username</b></label>
            <input class="js-username-login" type="text" placeholder="Enter username" name="username" required>
            <label for="password"><b>Password</b></label>
            <input class="js-password-login" type="password" placeholder="Enter Password" name="password" required>
            <button type="submit" class="js-request-login login-btn">Log in</button>
        </form>
    </div>
    `;
}

function getLoginForm() {
    $("body").on("click", ".js-login-btn", (event) => {
        event.preventDefault();
        deleteCurrentView();
        renderView(loginForm());
    });
}

function takeToDashboard(){
    $("body").on("click", ".js-dashboard", (event) => {
        event.preventDefault();
        const userToken = localStorage.getItem('userToken');
        loginWithToken(userToken);
        }
    );
}

function loadandAppendUserPostedItems(users) {
    $.ajax({
        url: '/items/getLoggedUserItems',
        type: 'GET',
        headers: {"Authorization": `Bearer ${localStorage.getItem('userToken')}`},
        success: function(items) {
            // filter items into new array that cotain items beloging to logged user only
            console.log("success");
            // const userItems = res.items.filter(item => item.seller['_id'] === user['_id']);
            // console.log(res);
            items.forEach((item) =>{
                $(".js-user-posts").append(`
                <li id="${item["_id"]}" class="item-preview">
                    <img class="item-image-preview" src="${item.image}" />
                    <p>${item.price}</p>
                    <p>${item.name}</p>
                    <p>${item.shortDescription}</p>
                    <div><button class="js-delete-post">Delete item</button></div>
                    <div><button class="js-edit-post">Edit item</button></div>
                </li>
                `);
            });
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function userDashboard(user) {
    const numberOfItems = $(".js-user-posts ul li").length;
    // console.log();
    return `
    <div class="account-page">
        <div class="profile">
            <img class="user-image" src="data:image/jpeg;base64,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"/>
        </div>
        <div class="account-info">
            <h1>Account Information</h1>
            <p>user name: ${user.loggedUser.username}</p>
            <p>email: ${user.loggedUser.email}</p>
            <p>live posts: ${numberOfItems}</p>
        </div>
        <div class="user-posts">
            <ul class="js-user-posts">
            </ul>
        </div>
        <button class="js-make-a-post">Post an item for sale</button>
    </div>
    `;
}

function generateAccountPage(user) {
    renderView(userDashboard(user));
    loadandAppendUserPostedItems();
}

function newItemForm() {
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
            url: ITEMS_URL,
            headers: {"Authorization": `Bearer ${localStorage.getItem('userToken')}`},
            data: itemToBePosted,
            success: function(newItem){
                //reload updated page
                // console.log(newItem);
                // deleteCurrentView();
                // generateAccountPage();
                deleteCurrentView();
                // generateAccountPage();
                loginWithToken(localStorage.getItem('userToken'));
            }
        });
    });
}

function postNewItem() {
    $(".js-app-container").on("click", ".js-make-a-post", (event) => {
        deleteCurrentView();
        renderView(newItemForm());
    });
}

function requestTokenToLogin() {
   $(".js-app-container").on("click", ".js-request-login", (event) => {
    event.preventDefault();
    //get user's entered password
    const username = $(".js-username-login").val();
    const password = $(".js-password-login").val();
    console.log(username);
    console.log(password);
        $.ajax({
            url: '/auth/login',
            type: 'POST',
            data: {password, username},
            success: function (tokenObject) {
                // USE returned jwt token to access prtected dashboard endpoint
                const userToken = tokenObject.authToken;
                //delete old stored token
                console.log(userToken);
                localStorage.removeItem('userToken');
                // set user token in local storage
                localStorage.setItem('userToken', userToken);
                //run function to access protected dashboard with user token
                loginWithToken(userToken);
            },
            error: function () {
                console.log("There was an error handling login");
            }
        });
   });
}

function loginWithToken(token) {
    $.ajax({
        url: '/dashboard',
        type: 'GET',
        headers: {"Authorization": `Bearer ${token}`},
        success: function(loggedUser) {
            // if authorized by endpoint load dashboard
            console.log(loggedUser);
            deleteCurrentView();
            renderView(generateAccountPage(loggedUser));
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function loadSignupForm() {
    $(".js-signup").on("click", (event) => {
        deleteCurrentView();
        renderView(signupForm);
    });
}

function goToHomePage(){
    $(".js-home-button").on("click", (event) => {
        $(".js-items-container").empty();
        getAllItemsForSale();
    });
}

function findItemById(itemContainer, itemId) {
    let foundItem = {};
    itemContainer.forEach((item) => {
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
        // deleteCurrentView();
        // $(".js-").empty();
        const itemId = ((event.target).closest("div").id);
        $.ajax({
            url: `/items/${itemId}`,
            success: function(res) {
                renderView(showProductDetails(res));
            }
        });
    });
}

function deleteItem() {
    $(".js-app-container").on("click", ".js-delete-post", (event) => {
        event.preventDefault();
        const itemId = event.target.closest("li").id;
        // ajax call to delete endpoint api
        $.ajax({
            type: 'DELETE',
            url: `/items/${itemId}`,
            success: function(res) {
                //reload dashboard
                deleteCurrentView();
                // generateAccountPage();
                loginWithToken(localStorage.getItem('userToken'));
            }
        });
    });
}

function checkChangedFields(formObject) {
    // const a = $(".js-name").attr("placeholder");
    const itemFileds = ['name', 'price', 'description', 'shortDescription'];
    const itemsToChange = [];
    if(field != ""){
        itemsToChange.push(filed);
    } else {
        return HTMLBodyElement;
    }
}

function getItemForEdit(itemId){
    $.ajax({
        type: 'GET',
        url: `/items/${itemId}`,
        success: function(item) {
            return renderView(editItemForm(item));
        }
    });
}

function editItemForm(item) {
    return `
        <section class="edit-layout" id="">
            <div class="item-image-edit-post">
                <img class="item-edit" src="${item.image}" id="${item["_id"]}"/>
            </div>
        <form class="js-edit-form">
            <label for="name">Name</label>
            <input class="text-input-form js-edited-name" id="name" type="text" placeholder="${item.name}"/>
            <label for="price">Price</label>
            <input class="text-input-form js-edited-price" id="price" type="number" placeholder="${item.price}"/>
            <label for="image">Image Url</label>
            <input class="text-input-form js-edited-image" id="image" type="text" placeholder="${item.image}"/>
            <label for="shortDescription">Short Description</label>
            <input class="text-input-form js-edited-shortDescription" id="shortDescription" type="text" placeholder="${item.shortDescription}"/>
            <label for="description">Description</label>
            <input class="text-input-form js-edited-description" id="description" type="text-area" placeholder="${item.description}"/>
            <button type="button" class="js-make-changes">Make Changes</button>
            <button class="js-cancel-changes" type="button">Cancel Changes</button>
        </form>
        </section>
    `;
}

function cancelChanges() {
    $(".js-app-container").on("click", (event) => {
        deleteCurrentView();
        loginWithToken(localStorage.getItem('userToken'));
    });
    
}


function createDefinedObject(obj) {
    return Object.keys(obj).reduce((acc, key) => {
      if(obj[key]){
        acc[key] = obj[key];
      }
      return acc;
    }, {})
  }

function changeItemValues() {
    $(".js-app-container").on("click", ".js-make-changes", (event) => {
        event.preventDefault();
        const formObject = {
            name: $(".js-edited-name").val(),
            price: $(".js-edited-price").val(),
            description: $(".js-edited-description").val(),
            shortDescription: $(".js-edited-shortDescription").val()
        }
        const itemId = $(".item-edit").attr("id");
         // update changed fields with put request
         $.ajax({
            type: 'PUT',
            url: `/items/${itemId}`,
            data: createDefinedObject(formObject),
            success: function(res){
                deleteCurrentView();
                // generateAccountPage();
                loginWithToken(localStorage.getItem('userToken'));
            }
        });
    });
}

function editItem() {
    $(".js-app-container").on("click", ".js-edit-post", (event) => {
        event.preventDefault;
        const itemId = event.target.closest("li").id;
        // delete current view
        deleteCurrentView();
        //render edit page with appropiate item to edit
        getItemForEdit(itemId);
        //attach object id for reference
        $(".edit-layout").attr('id', `${itemId.toString()}`);
    });
}

function createNewUser() {
    $(".js-app-container").on("click", ".js-create-user-btn", (event) => {
        event.preventDefault();
        //check to see if both fields for password match
        const password = $(".js-password").val();
        const repeatedPassword = $(".js-repeated-password").val();
        // console.log(password, repeatedPassword);
        if(password != repeatedPassword){
            $(".js-user-messages").append(`<p>Both passwords must match, please try again.</p>`);
            return new Error("passwords do not match");
        }
        let newUser = {
            firstName: $(".js-firstName").val(),
            lastName: $(".js-lastName").val(),
            username: $(".js-username").val(),
            email: $(".js-email").val(),
            password: $(".js-password").val()
        }
        console.log(newUser);
        // console.log(newUser);
        $.ajax({
            type:'POST',
            url: USERS_URL,
            data: JSON.stringify(createDefinedObject(newUser)),
            success: function(newUser){
                // console.log(newUser);
                // return true;
                //take to login page
                deleteCurrentView();
                renderView(loginForm());
            },
            error: function(error) {
                $(".js-user-messages").empty();
                $(".js-user-messages").append(`<p>${error}</p>`);
            }
        });
    });
}


function app() {
    getAllItemsForSale();
    showItemDetails();
    goToHomePage();
    getLoginForm();
    loadSignupForm();
    requestTokenToLogin();
    postNewItem();
    postItemForSale();
    deleteItem();
    editItem();
    changeItemValues();
    createNewUser();
    takeToDashboard();
    cancelChange();

}

$(app);