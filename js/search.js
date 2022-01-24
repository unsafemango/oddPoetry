let poems = JSON.parse(localStorage.getItem("poems"));
let titles = poems.map((poem) => {
  return { id: poem.id, title: poem.title, type: poem.type };
});

let poets = JSON.parse(localStorage.getItem("poets"));
let names = poets.map((poet) => {
  return { id: poet.id, name: poet.name, type: poet.type };
});

let database = [...titles, ...names];
let searchContent = document.querySelector(".search-content");

let searchBtn = document.querySelector(".search .fa-search");
let closeSearchBtn = document.querySelector(".close-search .fa-window-close");

let searchBar = document.querySelector("#search");

let searchOverlay = document.querySelector(".search-overlay");

let searchString;

// searchbar functionality
searchBar.addEventListener("keyup", (e) => {
  searchString = e.target.value;

  // search functionality
  const filteredSearch = database.filter((data) => {
    let { name, title } = data;
    if (name) {
      return name.toLowerCase().includes(searchString.toLowerCase());
    } else return title.toLowerCase().includes(searchString.toLowerCase());
  });

  // show each search result
  if (searchString == "") {
    searchContent.innerHTML = `
    <p class="no-results">No search results available</p>`;
  } else if (filteredSearch.length > 0) {
    searchContent.innerHTML = `
${filteredSearch
  .map((data) => {
    if (data.type == "poet") {
      if (window.location.pathname.includes("index")) {
        return `<a class="search-result" href="./poets/poet.html?id=${data.id}">${data.name}</a>`;
      } else
        return `<a class="search-result" href="../poets/poet.html?id=${data.id}">${data.name}</a>`;
    } else if (data.type == "poem") {
      if (window.location.pathname.includes("index")) {
        return `<a class="search-result" href="./poems/poem.html?id=${data.id}">${data.title}</a>`;
      } else
        return `<a class="search-result" href="../poems/poem.html?id=${data.id}">${data.title}</a>`;
    }
  })
  .join("")}
`;
  } else {
    searchContent.innerHTML = `<p class="no-results">No search results available</p>`;
  }
});

// show search results
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchOverlay.classList.toggle("show");
});

// close search results
closeSearchBtn.addEventListener("click", () => {
  searchOverlay.classList.remove("show");
});
