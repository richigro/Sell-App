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

// renders the home page takes data from api
function homePage(data){
    return `
        <main role="main">
            <div class="item">
                <h1>${data.itemsOnSale[0].title}</h1>
                <img src="${data.itemsOnSale[0].title}" />
                <p>short description</p>
            </div>
        </main>
        <footer role="contentinfo">

        </footer>`;
}

function app() {
    // renders home page few items on sale
    renderView(homePage(MOCK_ITEMS_ON_SALE));
}

$(app());