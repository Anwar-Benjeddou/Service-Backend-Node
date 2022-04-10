const app = require("../../../index");
const createHttpError = require("http-errors");

/**
 * @swagger
 * /colis/location/{id}:
 *   get:
 *     summary: Retrieve a list of location  colis.
 *     description: Retrieve the list of location colis.
 *     tags:
 *       - location
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the colis to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: colis location fetched with the given id
 *       400:
 *         description: colis location not found with the given id
 *
 */

app.get("/colis/location/:id", async (req, res, next) => {
  try {
    const provider = (
      await app.db
        .table("provider " + "as p")
        .join("app_user as u ", "u.id", "p.id")
    ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
    const coliss = (await app.db.table("colis").select("id", "provider"))
      .map((e) => ({ ...e, provider: provider[e.provider] }))
      .reduce((a, e) => ({ ...a, [e.id]: e }), {});

    const location = (
      await app.db("location_colis").where("colis", "=", req.params.id)
    ).map((e) => ({
      ...e,
      colis: coliss[e.colis],
    }));
    if (location.length === 0) {
      return res.json({
        message: "colis not found with this ID ",
        status: 200,
        data: location,
      });
    }

    res.json({
      message: "colis location fetched",
      status: 200,
      data: location,
    });
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal server error"));
  }
});
