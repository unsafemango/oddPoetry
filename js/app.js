// CATALOGUE
let poemsDOM = document.querySelector(".poems-list");
let poetsDOM = document.querySelector(".poets-list");

// ITEMS
let poemDOM = document.querySelector(".poem-container");
let poetDOM = document.querySelector(".poet-container");

// TITLE
let poemTitle = document.querySelector(".poem-title");
let poetTitle = document.querySelector(".poet-title");
let blogTitle = document.querySelector(".blog-title");

// HOME DAILY
let homeDailyDOM = document.querySelector(".home-daily");

// BACK TO PREVIOUS
let goBack = document.querySelector(".prev");

// MONTHLY
let monthlyPoemsDOM = document.querySelector(".month-poems-container");
let monthlyPoetsDOM = document.querySelector(".month-poets-container");
let monthlyProductsDOM = document.querySelector(".month-products-container");

// BLOG
let blogDOM = document.querySelector(".blog-list");
let blogContainerDOM = document.querySelector(".blog-container");

// FOOTER
let footer = document.querySelector("footer");

// PARAMS
let url = window.location.href;
let params = new URL(url).searchParams;
let id = params.get("id");

class Poems {
  async getPoems() {
    const response = await fetch("../data/poems.json");
    const data = await response.json();
    return data;
  }
}

class Poets {
  async getPoets() {
    const response = await fetch("../data/poets.json");
    const data = await response.json();
    return data;
  }
}

class Blogs {
  async getBlogs() {
    const response = await fetch("../data/blog.json");
    const data = await response.json();
    return data;
  }
}

class ProductsHome {
  async getProductsHome() {
    const response = await fetch("../data/products.json");
    const data = await response.json();
    return data;
  }
}

class Data {
  getPoems() {
    let p = new Poems();

    return p.getPoems().then((data) => {
      return data;
    });
  }

  getProducts() {
    let p = new ProductsHome();

    return p.getProductsHome().then((data) => {
      return data;
    });
  }

  getPoets() {
    let p = new Poets();

    return p.getPoets().then((data) => {
      return data;
    });
  }
}

class UI {
  // HOME DAILY
  async showHomeDaily(param) {
    let data = new Data();
    let poems = await data.getPoems();
    let poem = poems[param];

    let poets = await data.getPoets();
    let poet = poets[param];

    let products = await data.getProducts();
    let product = products[param];

    let content = `
    <!-- ----------- DAILY ----------- -->
      <div class="col-3">
        <div class="col-title">
          <h3>Poem of the day</h3>
          <div class="underline"></div>
        </div>
        <img src="${poem.iimage}" alt="${poem.title}" class="img" />
        <a href="poems/poem.html?id=${poem.id}" class="title">${poem.title}</a>
        <p id="author">Author: <a href="poets/poet.html?id=2" class="author">${poem.author}</a></p>
      </div>
      <!-- ----------- END OF DAILY ----------- -->

      <!-- ----------- DAILY ----------- -->
      <div class="col-3">
        <div class="col-title">
          <h3>Poet of the day</h3>
          <div class="underline"></div>
        </div>
        
          <img src="${poet.iimage}" alt="${poet.name}" class="img" />
        
        <a href="poets/poet.html?id=${poet.id}" class="poet">${poet.name}</a>
      </div>
      <!-- ----------- END OF DAILY ----------- -->

      <!-- ----------- DAILY ----------- -->
      <div class="col-3">
        <div class="col-title">
          <h3>Product of the day</h3>
          <div class="underline"></div>
        </div>
        <div class="hd-product-container">
          <img class="product-img" src="${product.iimage}" alt="${product.title}" class="img" />
        </div>
        <div class="product">
          <span href="#">${product.title}</span>
          <p>$${product.price}</p>
        </div>
      </div>
      <!-- ----------- END OF DAILY ----------- -->
    `;

    homeDailyDOM.innerHTML = content;
  }

  // SHOW MONTHLY CONTENT
  async showMonthly() {
    let data = new Data();
    let poems = await data.getPoems();
    let poets = await data.getPoets();
    let products = await data.getProducts();

    // ------------- SHOW POEMS MONTHLY -------------
    async function showPoems() {
      let poemArray = [poems[1], poems[2], poems[3]];

      let poetArray = poets.filter((poet) => {
        for (let i = 0; i < poemArray.length; i++) {
          if (poet.name == poemArray[i].author) {
            return poet;
          }
        }
      });

      let content = poemArray
        .map((poem) => {
          return `
      <!-- ----------- POEM -----------  -->
      <div class="poem-col-3">
        <a href="poems/poem.html?id=${poem.id}" class="title">${poem.title}</a>
        <p>By <a href="./poets/poet.html?id=${poetArray
          .map((poet) => {
            if (poet.name == poem.author) {
              return `${poet.id}`;
            }
          })
          .join("")}" class="author">${poetArray
            .map((poet) => {
              if (poet.name == poem.author) {
                return `${poet.name}`;
              }
            })
            .join("")}</a></p>
      </div>
      <!-- ----------- END OF POEM ----------- -->
        `;
        })
        .join("");

      monthlyPoemsDOM.innerHTML += content;
    }

    async function showPoets() {
      let poetArray = [poets[1], poets[5], poets[4]];

      let content = poetArray
        .map((poet) => {
          return `
        <!-- ----------- POET -----------  -->
        <div class="poet-col-3">
          <img src="${poet.iimage}" alt="${poet.name}" class="img" />
          <a href="poets/poet.html?id=${poet.id}" class="author">${
            poet.name
          }</a>
          <p class="poet-bio">${poet.bio.join(" ").substring(0, 320)}...</p>
          <a href="poets/poet.html?id=${
            poet.id
          }" class="poet-more" >Read More</a>
        </div>
        <!-- ----------- END OF POET ----------- -->
        `;
        })
        .join("");

      monthlyPoetsDOM.innerHTML += content;

      // let poetBio = document.querySelector(".poet-col-3 .poet-bio");
      // let string = poetBio.innerText;
      // poetBio.innerHTML = `${string.substring(0, 200)}...`;
    }

    async function showProducts() {
      let productsArray = [products[2], products[3], products[5]];

      let content = productsArray
        .map((product) => {
          return `
        <!-- ----------- PRODUCT -----------  -->
        <div class="product-col-3">
          <img src="${product.iimage}" alt="${product.title}"  class="img" />
          <div class="product">
            <p class="title">${product.title.substring(0, 30)}...</p>
            <p class="price">$${product.price}</p>
          </div>
        </div>
        <!-- ----------- END OF PRODUCT ----------- -->
        `;
        })
        .join("");

      monthlyProductsDOM.innerHTML += content;
    }

    showPoems();
    showPoets();
    showProducts();
  }

  // POEM CATALOGUE
  showPoems(poems) {
    let poets = JSON.parse(localStorage.getItem("poets"));
    let poemContent = poems
      .map((poem) => {
        return `
      <!-- ----------- POEM ----------- -->
      <div class="poem">
        <a href="poem.html?id=${poem.id}" class="title" data-id=${poem.id}>${poem.title}</a>
        <p>By <a href="#" class="poet">${poem.author}</a></p>
      </div>
      <!-- ----------- END OF POEM ----------- -->
      `;
      })
      .join("");
    poemsDOM.innerHTML = poemContent;

    let poemPoet = [...document.querySelectorAll(".poem .poet")];
    poemPoet.forEach((poemP) => {
      let poet = poets.find((poet) => poet.name == poemP.innerHTML);
      if (poets.find((poet) => poet.name == poemP.innerHTML)) {
        poemP.setAttribute("data-id", poet.id);
        poemP.setAttribute("href", `../poets/poet.html?id=${poet.id}`);
      }
    });
  }

  // SINGLE POEM
  showPoem(id) {
    let poem = Storage.getPoems(id);
    let poets = JSON.parse(localStorage.getItem("poets"));
    let poet = poets.find((poet) => poet.name == poem.author);

    poemTitle.innerHTML = `Odd Poetry | ${poem.title}`;

    let content = `
    <!-- --------------- POEM CONTENT --------------- -->
      <div class="poem">
        <p class="title">${poem.title}</p>
        <p>By <a href="../poets/poet.html?id=${poet.id}" class="author">${poem.author}</a></p>

        <div class="content"></div>
      </div>
      <!-- --------------- END OF POEM CONTENT --------------- -->

      <!-- --------------- POET INFORMATION --------------- -->
      <div class="poet">
        <p class="title">${poem.title}</p>
        <p class="author">By ${poem.author}</p>
        <p class="about">About this Poet</p>
        <img src="${poet.image}" alt="" class="img" />
        <p class="author-bio"></p>
        <a href="../poets/poet.html?id=${poet.id}">Read full Biography</a>

        <p class="more">More about this Poet</p>

        <div class="region">
          <p>Region:</p>
          <span>${poet.region}</span>
        </div>
      </div>
      <!-- --------------- END OF POET INFORMATION --------------- -->
    `;

    poemDOM.innerHTML = content;

    let poemContent = document.querySelector(".poem .content");
    let authorBio = document.querySelector(".poet .author-bio");

    let poemArray = poem.content
      .map((content) => {
        if (content == "") {
          return `<br>`;
        }
        return `
      <p>${content}</p>
      `;
      })
      .join("");

    let authorBioArray =
      poet.bio
        .map((bio) => {
          if (bio == "") {
            return `<br>`;
          }
          return `
          <p>${bio}</p>
        `;
        })
        .join("")
        .substring(0, 320) + `...`;

    authorBio.innerHTML = authorBioArray;
    poemContent.innerHTML = poemArray;
  }

  // helloWorld(id) {
  //   poemDOM.innerHTML = "This is a test";
  //   let poem = Storage.getPoems(id);
  //   console.log(poem);
  // }

  // POET CATALOGUE
  showPoets(poets) {
    let poems = JSON.parse(localStorage.getItem("poems"));
    let poetContent = poets
      .map((poet) => {
        return `
        <!-- ----------- POET ----------- -->
      <div class="poet">
        <img src="${poet.image}" alt="image" class="img" />
        <a href="poet.html?id=${poet.id}" class="name" data-id="${poet.id}">${
          poet.name
        }</a>
        ${poet.bio
          .map((bio) => `<p class="poet-bio">${bio}</p>`)
          .join("")
          .substring(0, 320)}...
        <a href="poet.html?id=${poet.id}" class="read-more">read more</a>
      </div>
      <!-- ----------- END OF POET ----------- -->
      `;
      })
      .join("");

    poetsDOM.innerHTML = poetContent;
  }

  // SINGLE POET
  showPoet(id) {
    let poet = Storage.getPoets(id);
    let poemsCollection = JSON.parse(localStorage.getItem("poems"));
    let poems = poemsCollection.filter((poem) => {
      return poem.author == poet.name;
    });
    let content = `
      <!-- --------------- POET HEADER --------------- -->
      <div class="poet-header">
        <img src="${poet.image}" alt="poet-image" />
        <div class="desc">
          <p class="poet-name">${poet.name}</p>
          <p class="poet-year">${poet.year}</p>
        </div>
      </div>
      <!-- --------------- END OF POET HEADER --------------- -->

      <!-- --------------- POET CONTENT --------------- -->
      <div class="poet-content">
        <!-- --------------- POET BIO --------------- -->
        <div class="poet-bio"></div>
        <!-- --------------- END OF POET BIO --------------- -->

        <!-- --------------- POET POEMS --------------- -->
        <div class="poet-poems">
          <p class="poet-poems-header">Poems by ${poet.name}</p>
          <div class="poets-poems-container">
            ${poems
              .map((p) => {
                return `<p class="p-content"><a href="../poems/poem.html?id=${p.id}" class="content">${p.title}</a></p>`;
              })
              .join("")}
          </div>

          <p class="poet-poems-more">More about this poet</p>

          <div class="region">
            <p>Region:</p>
            <span>${poet.region}</span>
          </div>
        </div>
        <!-- --------------- END OF POET POEMS --------------- -->
      </div>
      <!-- --------------- END OF POET CONTENT --------------- -->
    `;

    poetDOM.innerHTML = content;

    let poetBio = document.querySelector(".poet-content .poet-bio");

    let poetBioArray = poet.bio
      .map((bio) => {
        if (bio == "") {
          return `<br>`;
        }
        return `
        <p>${bio}</p>
      `;
      })
      .join("");

    poetBio.innerHTML = poetBioArray;

    poetTitle.innerHTML = `Odd Poetry | ${poet.name}`;
  }

  async showBlogs() {
    let blogs = JSON.parse(localStorage.getItem("blog"));
    let content = blogs
      .map((blog) => {
        return `
        <!-- ----------- BLOG ----------- -->
      <div class="poet">
        <img src="../img/banner.jpg" alt="image" class="img" />
        <a href="./singleblog.html?id=${blog.id}" class="name" data-id="${
          blog.id
        }">${blog.title}</a>
        ${blog.content
          .map((blog) => `<p class="poet-bio">${blog}</p>`)
          .join("")
          .substring(0, 320)}...
        <a href="./singleblog.html?id=${
          blog.id
        }" class="read-more">read more</a>
      </div>
      <!-- ----------- END OF BLOG ----------- -->
      `;
      })
      .join("");

    blogDOM.innerHTML = content;
  }

  async showSingleblog(id) {
    let blog = Storage.getPost(id);
    let content = `
      <!-- ----------- BLOG HEADER ----------- -->
      <div class="poet-header">
        <img src="../img/banner.jpg" alt="poet-image" />
        <div class="desc">
          <p class="poet-name">${blog.title}</p>
        </div>
      </div>
      <!-- ----------- END BLOG HEADER ----------- -->

      <!-- --------------- BLOG CONTENT --------------- -->
      <div class="poet-content">
        <!-- --------------- BLOG INFO --------------- -->
        <div class="poet-bio">
          ${blog.content
            .map((blog) => {
              if (blog == "") {
                return `<br>`;
              }
              return `
        <p>${blog}</p>
      `;
            })
            .join("")}
        </div>
        <!-- --------------- END OF POET BIO --------------- -->

        <!-- --------------- BLOG MISC --------------- -->
        <div class="poet-poems">
        </div>
        <!-- --------------- END OF BLOG MISC --------------- -->
      </div>
      <!-- --------------- END OF BLOG CONTENT --------------- -->
    `;

    blogContainerDOM.innerHTML = content;
    blogTitle.innerHTML = `Odd Poetry | ${blog.title}`;
  }

  showFooter() {
    const date = new Date();
    footer.innerHTML = `
      <div class="copyright">
        &copy; ${date.getFullYear()} <p>Odd</p>Poetry
      </div>
      <div class="socials">
        <div class="icon">
          <a href="https://www.twitter.com">
            <i class="fab fa-twitter"></i>
          </a>
        </div>

        <div class="icon">
          <a href="https://www.facebook.com">
            <i class="fab fa-facebook-f"></i>
          </a>  
        </div>

        <div class="icon">
        <a href="https://www.instagram.com">
          <i class="fab fa-instagram"></i>
        </a>  
        </div>
      </div>
    `;
  }

  async backToPrevious() {
    goBack.addEventListener("click", () => {
      window.history.back();
    });
  }
}

class Storage {
  static savePoems(poems) {
    localStorage.setItem("poems", JSON.stringify(poems));
  }

  static getPoems(id) {
    let poems = JSON.parse(localStorage.getItem("poems"));
    return poems.find((poem) => poem.id == id);
  }

  static savePoets(poets) {
    localStorage.setItem("poets", JSON.stringify(poets));
  }

  static getPoets(id) {
    let poets = JSON.parse(localStorage.getItem("poets"));
    return poets.find((poets) => poets.id == id);
  }

  static saveProductsHome(productsHome) {
    localStorage.setItem("productsHome", JSON.stringify(productsHome));
  }

  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("productsHome"));
    return products.find((product) => product.id == id);
  }

  static saveBlog(blog) {
    localStorage.setItem("blog", JSON.stringify(blog));
  }

  static getPost(id) {
    let blogs = JSON.parse(localStorage.getItem("blog"));
    return blogs.find((blog) => blog.id == id);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let poems = new Poems();
  let ui = new UI();
  let poets = new Poets();
  let blog = new Blogs();
  let pHome = new ProductsHome();

  ui.showFooter();
  ui.backToPrevious();

  pHome.getProductsHome().then((data) => {
    Storage.saveProductsHome(data);
  });

  poems.getPoems().then((data) => {
    Storage.savePoems(data);
    ui.showPoems(data);
  });

  poets.getPoets().then((data) => {
    Storage.savePoets(data);
    ui.showPoets(data);
  });

  blog.getBlogs().then((data) => {
    Storage.saveBlog(data);
  });

  async function showPoem() {
    ui.showPoem(id);
  }

  async function showPoet() {
    ui.showPoet(id);
  }

  async function showHomeDaily() {
    ui.showHomeDaily(2);
  }

  async function showMonthly() {
    ui.showMonthly();
  }

  showPoet();
  showPoem();
  showHomeDaily();
  showMonthly();
  ui.showBlogs();
  ui.showSingleblog(id);
});
