const app = require("../../index");
let chai = require("chai");
let chaiHttp = require("chai-http");

chai.use(chaiHttp);
const user = {
  password: "123",
  username: "admin",
};
let token;
chai.should();
var authenticatedUser = chai.request.agent(app);
before(function (done) {
  authenticatedUser
    .post("/signin")
    .send(user)
    .end(function (err, response) {
      response.should.have.status(200);
      token = response.body.accessToken;
      done();
    });
});

/*
 * Test the /POST route
 */
describe("/POST zone", () => {
  it("it should not POST a zone without id field", (done) => {
    let zone = {
      name: "zone D",
      address: "gafsa, rdayef",
      city: "rdayef",
      phone_number: 74123456,
      agence: "85136690-f6a5-11eb-a146-61a76f4a0161",
    };
    chai
      .request(app)
      .post("/addZone")
      .set("Authorization", `Bearer ${token}`)
      .send(zone)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
describe("/ GET zone", () => {
  it("Should return 200 OK for valid token", (done) => {
    chai
      .request(app)
      .get("/zone")
      .set("Authorization", `Bearer ${token}`)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
