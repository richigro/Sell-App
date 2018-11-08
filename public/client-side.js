const MOCK_ITEMS_ON_SALE = {
    "itemsOnSale": [
        {
            "id": "1111111",
            "title": "Sewing Machine",
            "price": "100",
            "description": "John Doe",
            "contact": {
                "phone": "+210123578",
                "email": "asdf@asdf.com"
            }, 
            "publishedAt": 1470016976609
        }, 
        {
            "id": "1111111",
            "title": "Sewing Machine",
            "price": "100",
            "description": "John Doe",
            "contact": {
                "phone": "+210123578",
                "email": "asdf@asdf.com"
            }, 
            "publishedAt": 1470016976609
        },
        {
            "id": "1111111",
            "title": "Sewing Machine",
            "price": "100",
            "description": "John Doe",
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

// renders the home page takes data from api
function homePage(data){
    return `
        <main role="main">
            <div class="js-item item">
                <h1>${data.itemsOnSale[0].title}</h1>
                <img src="#" />
                <p>short description</p>
            </div>
        </main>
        <footer role="contentinfo">

        </footer>`;
}

function productDetailPage(){
    return `
        <main role="main">
            <h1>Item title here</h1>
            <img src="#"/>
            <div class="item-description">
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
            </div>
            <div class="seller-info">
                <h1>Contact Seller</h1>
                <p>email: dfaf@adaf.com</p>
                <p>phone: 21341231234</p>
                <p>Location Houston Texas</p>
            </div>
        </main>
    `;
}


function showItemDetail(){
    $(".js-app-container").on("click", ".js-item", (event) => {
        // deletes what is on current view
        deleteView();
        // loads new view
        renderView(productDetailPage());
    });
}
function app() {
    // renders home page few items on sale
    renderView(homePage(MOCK_ITEMS_ON_SALE));
    showItemDetail();
}

$(app());