"use strict";

const MOCK_ITEMS_ON_SALE = {
    "itemsOnSale": [
        {
            "id": '1',
            image: "https://images.craigslist.org/00t0t_WuM79Dms7O_600x450.jpg",
            name: "Sewing Machine",
            "price": "200",
            "description": "Singer Sewing Machine in Working Condition, in Solid wood Limited Federal Style Singer Cabine",
            "short-description": "High-end sewing machine slighty used",
            "contact":
              {
              "seller": "SadWolf175",
              "phone": "(016)-083-5458",
              "email": "Maryam.Mocking11@Outlook.Com",
              "location": "Plompetorenbrug"
              },
            "publishedAt": 1470016976609
          },
          {
            "id": '2',
            "image": "https://images.craigslist.org/00A0A_2KJlKrWn3VW_600x450.jpg",
            "name": "Reams of Paper",
            "price": "20",
            "description": "Earth's Choice copier paper glossy office paper. 500 sheets, Color Lock technology",
            "short-description": "20lbs letter stock 8.5X11",
            "contact":
              {
              "seller": "Happyswan117",
              "phone": "(069)-433-7044",
              "email": "Sophia.King41@Yahoo.Com",
              "location": "Great King Street"
              },
            "publishedAt": 1470016976609
          },
          {
            "id": '3',  
            "image": "https://images.craigslist.org/00101_iivDJvqAYaK_600x450.jpg",
            "name": "Fox Rockstar Helmet v1",
            "price": "100",
            "description": "RockStar Fox V1 51-52cm youth size large Helmet in Excellent condition. Used for our dirt bike that we no longer have",
            "short-description": "Used for our dirt bike that we no longer have",
            "contact":
              {
              "seller": "Smallcat600",
              "phone": "(691)-077-3227",
              "email": "Luigi.Garnier11@Outlook.Com",
              "location": "Rue Du Bon-Pasteur"
              },
            "publishedAt": 1470016976609
          },
          {
            "id": '4',  
            "image": "https://images.craigslist.org/00P0P_NbvGkvGObM_600x450.jpg",
            "name": "Cardi B T-shirt",
            "price": "25",
            "description": "Brand new never used Cardi B XL Unisex T-shirt in new condition/ Never Used.",
            "short-description": "Brand new never used Cardi B XL",
            "contact":
              {
              "seller": "Bluegorilla626",
              "phone": "94461035",
              "email": "Maria.J0rgensen3@Gmail.Com",
              "location": "Højgårdsvej"
              },
            "publishedAt": 1470016976609
          },
          {
            "id": '5',  
            "image": "https://images.craigslist.org/00P0P_dzWWB8l5hxm_600x450.jpg",
            "name": "Silver Nissan 2004 titan",
            "price": "8970",
            "description": "Silver Nissan 2004 titan, 180,412 miles, automatic,2 door, 8 cylinders, leather seats",
            "short-description": " 180,412 miles",
            "contact":
              {
              "seller": "Angrygorilla963",
              "phone": "96044921",
              "email": "Munira.Strande94@Harvard.Student.Edu",
              "location": "Elverumgata"
              },
            "publishedAt": 1470016976609
          },
          {
            "id": '6',  
            "image": "https://images.craigslist.org/00c0c_h7FO7e0zySN_600x450.jpg",
            "name": "Lots of Rv vehicles",
            "price": "700",
            "description": "Garage sale Saturday and Sunday. Everything must go. If you have a 99-06 ford truck I've probably got parts for it. Too much to list. Come on out from 7:45-2 on Saturday and 10-? On Sunday ",
            "short-description": "Garage sale Saturday and Sunday. Everything must go",
            "contact":
              {
              "seller": "Goldenbear151",
              "phone": "58334456",
              "email": "Alexander.Poulsen57@Hotmail.Com",
              "location": "Søbakken"
              },
            "publishedAt": 1470016976609
          },
          {
            "id": '7',  
            "image": "https://images.craigslist.org/00606_jErp8JUFk24_600x450.jpg",
            "name": " living room sofa",
            "price": "400",
            "description": "living room set. leather sofa, loveseat and recliner. each outside seat on sofa and loveseat recline. Camel color. 3 years old with a little worn spots. All recliners work great. cash only, pick up ",
            "short-description": "living room set. leather sofa, loveseat and recliner",
            "contact":
              {
              "seller": "Goldendog652",
              "phone": "(172)-245-1224",
              "email": "Alan.Lawson29@Yahoo.Com",
              "location": "W Belt Line Rd"
              },
            "publishedAt": 1470016976609
          },
          {
            "id": '8',  
            "image": "https://images.craigslist.org/00b0b_lC8pfkbzOyK_600x450.jpg",
            "name": " Nike Mens Hi-Toe",
            "price": "63",
            "description": "4Sale:Nike Men's Basketball Hi-Toe, Size 9, Red/Silver Logo -Style: Hi-Toe Hyperdunk Meetup is at HEB at Grissom Rd/Tezel, Active public site, Cash only -Not shown out of a private home",
            "short-description": "Nike Mens Hi-Toe Size 9, Red w Silver Logo",
            "contact":
              {
              "seller": "Happyostrich375",
              "phone": "(879)-955-9455",
              "email": "Flavio.Smids86@Aol.Com",
              "location": "Jacobijnenstraat"
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

function showHomePage() {
    MOCK_ITEMS_ON_SALE.itemsOnSale.forEach((item) => {
        renderView(itemList(item));
    });
}

// renders the home page takes data from api
function itemList(item){
    return `
        <div class="js-item item-container" id=${item.id}>
            <h1 class="item-title">${item.name}</h1>
            <img class="item-img-home" src="${item.image}" />
            <p class="item-desc">${item["short-description"]}</p>
        </div>`;    
}

function productDetailPage(item){
    return `
        <main role="main">
            <h1>${item.name}</h1>
            <img src="${item.image}" alt="${item.name}"/>
            <div class="item-description">
                <p>${item.description}</p>
            </div>
            <div class="seller-info">
                <h1>Contact Seller</h1>
                <p>Seller: ${item.contact["seller"]}</p>
                <p>email: ${item.contact["email"]}</p>
                <p>phone: ${item.contact["phone"]}</p>
                <p>Location: ${item.contact["location"]}</p>
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
        <button class="js-make-a-post"> Make a new post!</button>
    </div>
    `;
}

function newPostPage() {
    return `
        <div class="post-page">
            <div class="item-descrition">
                <form>
                    <input type="text"/>
                </form>
            </div>
            <div class="item-picture">
                <img src="#" />
            </div>
            <div class="seller-info">
                <h1>Seller Info</h1>
                <p>Email: </p>
                <p>Phone: </p>
                <p>Location: General area </p>
            </div>
            <button>Post for sale</button>
            <button>Cancel post</button>
        </div>
    `;
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

function    loginToAccount() {
    $(".js-login-page").on("click", (event) => {
        console.log("hi");
        deleteView();
        renderView(loginPage());
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
    showHomePage();
    showItemDetails();
    goToHomePage();
    loginToAccount();
    displayUserAccount();
    makeNewPost();
}

$(app);