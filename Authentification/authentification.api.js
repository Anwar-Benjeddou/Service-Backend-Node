const app = require("../index");
const config = require("./config");
const jwt = require("jsonwebtoken");
app.post("/v3/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const [user] = await app.db
      .from("app_user")
      .select("*")
      .where("app_user.username", username);

    if (!user) {
      res.status(200).send({ notice: "User Not Found" });
    } else {
      //const passwordIsValid= await verify(user.password, password);
      const passwordIsValid = user.password == password;

      if (!passwordIsValid) {
        res.status(401).send({
          accessToken: null,
          notice: "Invalid Password!",
        });
      } else {
        let authorities = [];
        let idRole = await app.db
          .from("user_privilege ")
          .select("privilege")
          .where("users", "=", user.id); // update user->users

        let userRole = await app.db
          .from("privilege")
          .select("*")
          .where(
            "id",
            "IN",
            idRole.map((e) => e.privilege)
          );

        for (let i = 0; i < userRole.length; i++) {
          authorities.push("ROLE_" + userRole[i].name.toUpperCase());
        }
        const token = jwt.sign(
          { id: user.id, roles: authorities, username: user.username },
          config.secret
        );
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
