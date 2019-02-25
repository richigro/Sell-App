"use strict";

const ITEMS_URL = '/items';
const USERS_URL = '/users';

// appends a view to the app
function renderView(view){
    $(".js-app-container").append(view);
}

function deleteCurrentView() {
    $(".js-app-container").empty();
}

function getAllItemsForSale() {
    $.ajax({
        url: ITEMS_URL,
        dataType: 'json',
        success: function(res) {
            res.items.forEach((item) => {
                renderView(itemContainer(item));
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
        <main role="main">
            <h1>${item.name}</h1>
            <p>$${item.price}</p>
            <img src="${item.image}" alt="${item.name}"/>
            <div class="item-description">
                <p>${item.description}</p>
            </div>
            <div class="seller-info">
                <h1>Contact Seller</h1>
                <p>Seller: ${item.seller.username}</p>
                <p>email: ${item.seller.email}</p>
            </div>
        </main>
    `;
}

function signupForm() {
    return `
    <div class="js-sign-up-page">
        <div class="js-user-messages">
        </div>
        <form action="#" class="sign-up-form">
                <h1 class="sign-up-title-text">Sign Up</h1>
                <div class="clearfix">
                    <p>Do you already have an Account? Login here</p>
                    <button type="submit" class="js-login-page-btn">Log in</button>    
                </div>
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
    </div>
  `;
}

function loginForm() {
    return `
    <div class="js-login-page login-page">
        <div class="js-user-messages-login">
        </div>
        <form class="login-form">
            <h1 class="sign-up-title-text">Login</h1>
            <label for="username"><b>Username</b></label>
            <input class="js-username-login" type="text" placeholder="Enter username" name="username" required>
            <label for="password"><b>Password</b></label>
            <input class="js-password-login" type="password" placeholder="Enter Password" name="password" required>
            <button type="submit" class="js-login-btn">Log in</button>
        </form>
    </div>
    `;
}

function getLoginForm() {
    $(".js-app-container").on("click", ".js-login-page-btn", (event) => {
        event.preventDefault();
        deleteCurrentView();
        renderView(loginForm());
    });
}

function loadandAppendUserPostedItems(users) {
    $.ajax({
        url: '/items/getLoggedUserItems',
        data: users,
        success: function(res) {
            // filter items into new array that cotain items beloging to logged user only
            console.log("success");
            // const userItems = res.items.filter(item => item.seller['_id'] === user['_id']);
            // console.log(userItems);
            // userItems.forEach((item) =>{
            //     $(".js-user-posts").append(`<li id="${item["_id"]}" class="item-preview">
            //     <img class="item-image-preview" src="${item.image}" />
            //     <p>${item.price}</p>
            //     <p>${item.name}</p>
            //     <p>${item.shortDescription}</p>
            //     <div><button class="js-delete-post">Delete post</button></div>
            //     <div><button class="js-edit-post">Edit Post</button></div>
            //     </li>
            //     `
            // });
        }
    });
}

function userDashboard() {
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
            <ul class="js-user-posts">
            </ul>
        </div>
        <button class="js-make-a-post"> Make a new post!</button>
    </div>
    `;
}

function generateAccountPage(user) {
    renderView(userDashboard());
    loadandAppendUserPostedItems(user);
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
                deleteCurrentView();
                generateAccountPage(newItem);
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
   $(".js-app-container").on("click", ".js-login-btn", (event) => {
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
            // console.log(loggedUser);
            deleteCurrentView();
            renderView(generateAccountPage(loggedUser));
        },
        error: function(err) {
            console.log(err);
        }
    });
}

function loadSignupForm() {
    $(".js-login-page").on("click", (event) => {
        deleteCurrentView();
        renderView(signupForm);
    });
}

function goToHomePage(){
    $(".js-home-button").on("click", (event) => {
        deleteCurrentView();
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
        deleteCurrentView();
        const itemId = ((event.target).closest("div").id);
        $.ajax({
            //fix this
            // fix this
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
                generateAccountPage();
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
            <button type="button">Cancel Changes</button>
        </form>
        </section>
    `;
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
                generateAccountPage();
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
        // console.log(newUser);
        $.ajax({
            type:'POST',
            url: USERS_URL,
            data: createDefinedObject(newUser),
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
}

$(app);