require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;
const axios = require("axios");
const BASE_URL = process.env.BASE_URL;
const API_SECRET = process.env.API_SECRET;

app.use(cors());

app.get("/", (request, response) => {
  axios
    .get(`${BASE_URL}popular?api_key=${API_SECRET}&language=fr&page=1`)
    .then((res) => {
      response.send(res.data.results);
    });
});

app.get("/toprated", (request, response) => {
  axios
    .get(`${BASE_URL}top_rated?api_key=${API_SECRET}&language=fr&page=1`)
    .then((res) => {
      response.send(res.data.results);
    });
});
app.get("/upcoming", (request, response) => {
  axios
    .get(`${BASE_URL}upcoming?api_key=${API_SECRET}&language=fr&page=1`)
    .then((res) => {
      response.send(res.data.results);
    });
});
app.get("/actors/:id", function (request, response) {
  axios
    .get(
      `${BASE_URL}${request.params.id}/credits?api_key=${API_SECRET}&language=fr`
    )
    .then((res) => {
      response.send(res.data.cast);
    });
});

app.get("/movie/similar/:id", function (request, response) {
  axios
    .get(
      `${BASE_URL}${request.params.id}/similar?api_key=${API_SECRET}&language=fr`
    )
    .then((res) => {
      response.send(res.data.results);
    });
});
app.get("/movie/:id", function (request, response) {
  axios
    .get(`${BASE_URL}${request.params.id}?api_key=${API_SECRET}&language=fr`)
    .then((res) => {
      response.send(res.data);
    });
});

app.get("/movie/search/:query", (request, response) => {
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_SECRET}&language=fr&query=${request.params.query}`
    )
    .then((res) => {
      response.send(res.data);
    });
});
app.get("/:page", (request, response) => {
  axios
    .get(
      `${BASE_URL}popular?api_key=${API_SECRET}&language=fr&page=${request.params.page}`
    )
    .then((res) => {
      response.send(res.data.results);
    });
});

app.listen(port, () => {
  console.log(`This server listenning at ${port}`);
});
