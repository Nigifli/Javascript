const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".navbar a");

function showPage(pageId) {
  pages.forEach(p => p.style.display = "none");
  document.getElementById(pageId).style.display = "block";

  navLinks.forEach(link => link.classList.remove("active"));
  document.querySelector(`.navbar a[data-page="${pageId}"]`).classList.add("active");
}

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const pageId = link.getAttribute("data-page");
    showPage(pageId);
  });
});

showPage("home");

function displayJoke(container, data) {
  if (Array.isArray(data)) data = data[0];
  if (data.setup && data.punchline) {
    container.innerHTML = `<h3>${data.setup}</h3><p><b>${data.punchline}</b></p>`;
  } else if (data.joke) {
    container.innerHTML = `<p>${data.joke}</p>`;
  } else {
    container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  }
}

function fetchAndShow(url, container) {
  container.innerHTML = "⏳ Töltés...";
  fetch(url)
    .then(r => {
      if (!r.ok) throw new Error("Nincs ilyen ID-val rendelkező vicc!");
      return r.json();
    })
    .then(data => displayJoke(container, data))
    .catch(err => container.innerHTML = `<p style="color:red;">⚠️ ${err.message}</p>`);
}

document.getElementById("btn-random").addEventListener("click", () => {
  fetchAndShow("https://official-joke-api.appspot.com/jokes/random", document.getElementById("random-container"));
});

document.getElementById("btn-programming").addEventListener("click", () => {
  fetchAndShow("https://official-joke-api.appspot.com/jokes/programming/random", document.getElementById("programming-container"));
});

document.getElementById("btn-general").addEventListener("click", () => {
  fetchAndShow("https://official-joke-api.appspot.com/jokes/general/random", document.getElementById("general-container"));
});

document.getElementById("btn-knock").addEventListener("click", () => {
  fetchAndShow("https://official-joke-api.appspot.com/jokes/knock-knock/random", document.getElementById("knock-container"));
});

document.getElementById("btn-by-id").addEventListener("click", () => {
  const id = document.getElementById("input-id").value;
  const container = document.getElementById("id-container");
  if (id) {
    fetchAndShow(`https://official-joke-api.appspot.com/jokes/${id}`, container);
  } else {
    container.innerHTML = `<p style="color:orange;">Adj meg egy ID-t!</p>`;
  }
});
