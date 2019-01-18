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


// renders the home page takes data from api
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

function loadandAppendUserPostedItems() {
    $.ajax({
        url: '/for-sale',
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

function deleteUserPostFromDashboard() {
    $(".js-app-container").on("click", ".js-delete-post", (event) => {
        event.preventDefault();
        const itemId = event.target.closest("li").id;
        console.log(itemId);
        // ajax call to delete endpoint api
        $.ajax({
            type: 'DELETE',
            url: `/delete/post/${itemId}`,
            success: function(res) {
                console.log(res);
                //refresh dashboard
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
        url: `/for-sale/${itemId}`,
        success: function(item) {
            console.log(item);
            return renderView(editPostPage(item));
        }
    });
}

function editPostPage(item) {
    return `
        <section class="edit-layout" id="">
            <div class="item-image-edit-post">
                <img src="${item.image}"/>
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

function makeChanges() {
    $(".js-app-container").on("click", ".js-make-changes", (event) => {
        event.preventDefault();

        const formObject = {
            name: $(".js-edited-name").val(),
            price: $(".js-edited-price").val(),
            description: $(".js-edited-description").val(),
            shortDescription: $(".js-edited-shortDescription").val()
        }
         // update changed fields with put request
         $.ajax({
            type: 'PUT',
            url: `/edit/post/${itemId}`,
            data: formObject,
            success: function(res){
                console.log("PUT worked!");
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
        // console.log(itemId.toString());
        $(".edit-layout").attr('id', `${itemId.toString()}`);
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
    deleteUserPostFromDashboard();
    editPost();
    makeChanges();
}

$(app);