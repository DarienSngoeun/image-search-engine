const accessKey = "SgySkuRFbdgP-JX0erPxCPc02C3hYS82z8IeqqVEPiY";
const searchForm = document.getElementById("search__form");
const searchBox = document.getElementById("search__box");
const searchResult = document.getElementById("search__result");
const showMoreBtn = document.getElementById("show__more--btn");

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  const imagesHTML = data.results.map((img) => imageHTML(img)).join("");

  if (page === 1) {
    searchResult.innerHTML = imagesHTML;
  } else {
    searchResult.innerHTML += imagesHTML;
  }

  showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});

function imageHTML(img) {
  return `<a href="${img.links.html}">
            <img src="${img.urls.small}">
        </a>`;
}
