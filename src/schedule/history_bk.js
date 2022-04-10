const schedule = require("node-schedule");
const app = require("../../index");

const date= "0 0 * * 0"
module.exports = schedule.scheduleJob(date, async function (y) {
  app.db.transaction(async (trx) => {
    const colis = await trx
      .table("colis")
      .select("id")
      .where("etat_final", "=", 1);
    const colis_histories = await trx
      .table("colis_history")
      .select("*")
      .where(
        "colis",
        "IN",
        colis.map((e) => e.id)
      );

      await trx.batchInsert("colis_history_bk",colis_histories,1000);

    await trx
      .table("colis_history")
      .where(
        "colis",
        "IN",
        colis.map((colisElem) => colisElem.id)
      )
      .del();
  });

  return console.log("done!");
});
