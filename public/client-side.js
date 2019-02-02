"use strict";

const ITEMS_URL = '/items';
const USERS_URL = '/users';

// appends a view to the app
function renderView(view){
    $(".js-app-container").append(view);
}

function deleteView() {
    $(".js-app-container").empty();
}

function showHomePage() {
    $.ajax({
        url: ITEMS_URL,
        dataType: 'json',
        success: function(res) {
            res.items.forEach((item) => {
                renderView(itemList(item));
            });
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
function itemList(item){
    return `
        <div class="js-item item-container" id=${item['_id']}>
            <div class="item-price-home">$${item.price}</div>
            <img class="item-image-home" src="${item.image}" />
            <div class="item-info-home">${normalizeIsoDate(item.publishedOn)} ${item.name}</div>
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
        <div class="js-user-messages">
        </div>
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
            <button type="submit" class="js-login-page-btn">Log in</button>    
        </div>
    </div>
  `;
}

function loginPage() {
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

function loadLoginPage() {
    $(".js-app-container").on("click", ".js-login-page-btn", (event) => {
        event.preventDefault;
        deleteView();
        renderView(loginPage());
    });
}

function loadandAppendUserPostedItems() {
    $.ajax({
        url: ITEMS_URL,
        success: function(res) {
            res.items.forEach((item) => $(".js-user-posts").append(`<li id="${item["_id"]}" class="item-preview">
            <img class="item-image-preview" src="${item.image}" />
            <p>${item.name}</p>
            <p>${item.shortDescription}</p>
            <div><button class="js-delete-post">Delete post</button></div>
            <div><button class="js-edit-post">Edit Post</button></div>
            </li>
            `));
        }
    });
}

function dashboardStructure() {
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

function generateAccountPage() {
    renderView(dashboardStructure());
    loadandAppendUserPostedItems();
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
            url: ITEMS_URL,
            data: itemToBePosted,
            success: function(newItem){
                //reload updated page
                deleteView();
                generateAccountPage();
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
   $(".js-app-container").on("click", ".js-login-btn", (event) => {
    event.preventDefault();
    //get user's entered password
    const username = $(".js-username-login").val();
    const password = $(".js-password-login").val();
    // console.log({password, username});
        // $.ajax({
        //     url: USERS_URL,
        //     type: 'POST',
        //     data: {password, username},
        //     success: function () {
        //         //delete current view
        //         deleteView();
        //         renderView(generateAccountPage());
        //     },
        //     error: function () {
        //         console.log("There was an error handling login");
        //     }
        // });
        deleteView();
                renderView(generateAccountPage());
   });
}

function loginToAccount() {
    $(".js-login-page").on("click", (event) => {
        deleteView();
        renderView(signupPage);
    });
}

function goToHomePage(){
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
        deleteView();
        const itemId = ((event.target).closest("div").id);
        $.ajax({
            //fix this
            // fix this
            url: `/items/${itemId}`,
            success: function(res) {
                renderView(productDetailPage(res));
            }
        });
    });
}

function deleteUserPostFromDashboard() {
    $(".js-app-container").on("click", ".js-delete-post", (event) => {
        event.preventDefault();
        const itemId = event.target.closest("li").id;
        // ajax call to delete endpoint api
        $.ajax({
            type: 'DELETE',
            url: `/items/${itemId}`,
            success: function(res) {
                //reload dashboard
                deleteView();
                generateAccountPage();
            }
        });
    });
}

function changedFields(formObject) {
    // const a = $(".js-name").attr("placeholder");
    const itemFileds = ['name', 'price', 'description', 'shortDescription'];
    const itemsToChange = [];
    if(field != ""){
        itemsToChange.push(filed);
    } else {
        return HTMLBodyElement;
    }
}

function renderItemToEdit(itemId){
    $.ajax({
        type: 'GET',
        url: `/items/${itemId}`,
        success: function(item) {
            return renderView(editPostPage(item));
        }
    });
}

function editPostPage(item) {
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

function makeChanges() {
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
                deleteView();
                generateAccountPage();
            }
        });
    });
}

function editPost() {
    $(".js-app-container").on("click", ".js-edit-post", (event) => {
        event.preventDefault;
        const itemId = event.target.closest("li").id;
        // delete current view
        deleteView();
        //render edit page with appropiate item to edit
        renderItemToEdit(itemId);
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
                return true;
                //take to login page
            },
            error: function() {
                $(".js-user-messages").empty();
                $(".js-user-messages").append(`<p>Please fill out all fields</p>`);
            }
        });
    });
}


function app() {
    showHomePage();
    showItemDetails();
    goToHomePage();
    loadLoginPage();
    loginToAccount();
    displayUserAccount();
    makeNewPost();
    postItemForSale();
    deleteUserPostFromDashboard();
    editPost();
    makeChanges();
    createNewUser();
}

$(app);