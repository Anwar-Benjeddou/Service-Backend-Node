const app = require("../../../index");
const jwt = require("jsonwebtoken");
const config = require("../../config");

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Login to the application.
 *     requestBody:
 *       name: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              username:          
 *                type: string
 *                example: oumaima1
 *                required: true
 *              password:          
 *                type: string
 *                example: 123
 *                required: true
 *
 *
                              
 *         text/plain:
 *           schema:
 *            type: string
 *     responses:
 *       201:
 *         description: signin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The user ID.
 *                       example: 03de03c4-64fd-40e8-ba8c-b7273d06f83f 
 *                     username:
 *                       type: string
 *                       description: The user's name.
 *                       example: admin
*/

app.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body)
    const [user] = await app.db
      .from("app_user")
      .select("*")
      .where("app_user.username", username)
      .where("status", "=","ACTIVE");
console.log(user)
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
        let roles = [];
        let permissions = [];
        let idRole = await app.db
          .from("user_privilege ")
          .select("privileges")
          .where("users", "=", user.id); // update user->users

        let userRole = await app.db
          .from("privilege")
          .select("*")
          .where(
            "id",
            "IN",
            idRole.map((e) => e.privileges)
          );
        let idPermission = await app.db
          .from("user_permission ")
          .select("permissions")
          .where("users", "=", user.id); // update user->users

        let userPermission = await app.db
          .from("permission")
          .select("*")
          .where(
            "id",
            "IN",
            idPermission.map((e) => e.permissions)
          );

        for (let i = 0; i < userRole.length; i++) {
          roles.push("ROLE_" + userRole[i].name.toUpperCase());
        }
        for (let i = 0; i < userPermission.length; i++) {
          permissions.push(
            "PERMISSION_" + userPermission[i].name.toUpperCase()
          );
        }
        const token = jwt.sign(
          {
            id: user.id,
            roles: roles,
            permissions: permissions,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            agence: user.agence,
            phone_number: user.phone_number,
            firstname: user.firstname,
            lastname: user.lastname,
          },
          config.secret
        );
        res.status(200).send({
          id: user.id,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          agence: user.agence,
          roles: roles,
          permissions: permissions,
          phone_number: user.phone_number,
          firstname: user.firstname,
          lastname: user.lastname,
          accessToken: token,
        });
        // console.log({
        //   id: user.id,
        //   username: user.username,
        //   email: user.email,
        //   agence: user.agence,
        //   roles: roles,
        //   permissions: permissions,
        //   accessToken: token,
        // });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});
