import Router from "vanilla-router";
import { getAllFitnessCenters, getFitnessCenter } from "./services.js";

const routes = {
  404: "/pages/404.html",
  "/": "/pages/index.html",
  centar: "/pages/centar.html",
};

var router = new Router({
  mode: "history",
  root: "/",
  hooks: {
    before: function () {
      const root = document.getElementById("root");
      root.innerHTML = `
        <h3>Loading...</h3>
      `;
    },
  },
  page404: function (path) {
    console.log('"/' + path + '" Page not found');
  },
});

const renderPage = async (path) => {
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());
  const root = document.getElementById("root");
  root.innerHTML = html;
};

router
  .add("", function () {
    renderPage("/").then(() => {
      getAllFitnessCenters().then((data) => {
        const fitnessCentri = document.querySelector(".fitnessCentri");

        data.forEach((centar) => {
          const fitnessCentar = document.createElement("div");
          fitnessCentar.innerHTML = `
          <h4>${centar.naziv}</h4>
          <p>${centar.adresa}</p>
          <a href="centar/${centar.id}">View more</a>
        `;
          fitnessCentri.append(fitnessCentar);
        });
        console.log(data);
      });
    });
  })
  .add("centar/(:any)", function (id) {
    let container;
    renderPage("centar")
      .then(() => {
        container = document.querySelector(".page-container");
        container.innerHTML = `<h3>Loading...</h3> `;
      })
      .finally(() => {
        getFitnessCenter(id).then((data) => {
          container.innerHTML = `
            <h3>${data.naziv}</h3>
            <p>${data.adresa}</p>
          `;
        });
      });
  })
  .check()
  .addUriListener();

window.router = router;
