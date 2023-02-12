function toggleLinks() {
  let navInner = document.querySelector(".nav-inner");
  if (navInner.classList.contains("show")) {
    navInner.classList.remove("show");
  } else {
    navInner.classList.add("show");
  }
}
