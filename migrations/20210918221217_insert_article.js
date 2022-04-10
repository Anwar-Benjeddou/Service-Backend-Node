const uuid = require("uuid");

const articles = [
  {
    article: "TUNIS",
  },
  {
    article: "ARIANA",
  },
  {
    article: "MANOUBA",
  },
  {
    article: "BEN AROUS",
  },
  {
    article: "NABEUL",
  },
  {
    article: "BIZERTE",
  },
  {
    article: "ZAGHOUAN",
  },
  {
    article: "SOUSSE",
  },
  {
    article: "MONASTIR",
  },
  {
    article: "MAHDIA",
  },
  {
    article: "SFAX",
  },
  {
    article: "BÉJA",
  },
  {
    article: "JENDOUBA",
  },
  {
    article: "KEF",
  },
  {
    article: "SILIANA",
  },
  {
    article: "Kairouan",
  },
  {
    article: "Sidi Bouzid",
  },
  {
    article: "Kasserine",
  },
  {
    article: "Gabès",
  },
  {
    article: "Medenine",
  },
  {
    article: "Gafsa",
  },
  {
    article: "Tozeur",
  },
  {
    article: "Tataouine",
  },
  {
    article: "Kébili",
  },
];
exports.up = function (knex) {
  let data = [];
  articles.forEach((elarticle) => {
    const id = uuid.v1().toLocaleUpperCase();

    return data.push({
      id: id,
      code: "ART_" + elarticle.article.toLocaleUpperCase(),
      article: elarticle.article.toLocaleUpperCase(),
    });
  });
  return knex("article").insert(
    data.map((d) => {
      return d;
    })
  );
};

exports.down = function (knex) {};
