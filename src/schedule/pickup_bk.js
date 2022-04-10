const schedule = require("node-schedule");
const app = require("../../index");

const date= "0 0 * * 0"
module.exports = schedule.scheduleJob(date, async function (y) {
  app.db.transaction(async (trx) => {
    const colis = await trx
      .table("colis")
      .select("id")
      .where("etat_final", "=", 1);
    const pickups = await trx
      .table("pickup")
      .select("*")
      .where(
        "colis",
        "IN",
        colis.map((e) => e.id)
      );

    await trx.batchInsert("pickup_bk",pickups,1000)

    await trx
      .table("pickup")
      .where(
        "colis",
        "IN",
        colis.map((colisElem) => colisElem.id)
      )
      .del();
  });

  return console.log("done!");
});
