const app1 = require("../index");

app1.post("/role/add", async (req, res) => {
  try {
    await app1.db
      .table("privilege")
      .insert(req.body)
      .then(() => res.json({ notice: "success", content: req.body }));
  } catch (error) {}
});
