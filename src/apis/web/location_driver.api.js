const app = require("../../../index");
const createHttpError = require("http-errors");

/**
 * @swagger
 * /driver/location/{id}:
 *   get:
 *     summary: Retrieve a single driver.
 *     description: Retrieve a single driver.
 *     tags:
 *       - location
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: String ID of the driver to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         decription: driver fetched with the given id
 *       400:
 *         description: driver not found with the given id
 *
 */

app.get("/driver/location/:id", async (req, res, next) => {
  try {
    const driver = (
      await app.db
        .table("driver " + "as p")
        .join("app_user as u ", "u.id", "p.id")
    ).reduce((a, e) => ({ ...a, [e.id]: e }), {});
    const location = (
      await app.db("location_driver").where("driver", "=", req.params.id)
    ).map((e) => ({ ...e, driver: driver[e.driver] }));
    if (location.length === 0) {
      return res.json({
        message: "User not found with this ID ",
        status: 200,
        data: location,
      });
    }

    res.json({
      message: "driver fetched",
      status: 200,
      data: location,
    });
  } catch (error) {
    console.log(error);
    next(new createHttpError.InternalServerError("Internal server error"));
  }
});
