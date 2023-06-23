
const API_key = "20b249a51f024f7c9f8be3930c0abcc5";
const url = "https://newsapi.org/v2/everything?q=";
let i = 0;

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_key}`);
    const data = await res.json();
    bindData(data.articles);

}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    console.log(articles.length);

    

    articles.forEach((article) => {
        if (!article.urlToImage) {
            return;
        };
        

        const cardclone = newsCardTemplate.content.cloneNode(true);

        fillDataInCard(cardclone, article);

        cardsContainer.appendChild(cardclone);

    });
}

function fillDataInCard(cardclone, article) {

    const newsImg = cardclone.querySelector("#news-img");
    const newsTitle = cardclone.querySelector("#news-title");
    const newsSource = cardclone.querySelector('#news-source');
    const newsDesc = cardclone.querySelector('#news-desc');


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleDateString("es-US", {
        timeZone: "Asia/Jakarta",

    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardclone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) {
        return;
    }
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
})