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
describe("/ GET agence", () => {
  it("Should return 200 OK for valid token", (done) => {
    chai
      .request(app)
      .get("/agence")
      .set("Authorization", `Bearer ${token}`)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
/*
 * Test the /POST route
 */
describe("/POST agence", () => {
  it("it should not POST a agence without id field", (done) => {
    let agence = {
      name: "agence D",
      address: "gafsa, rdayef",
      city: "rdayef",
      phone_number: 74123456,
    };
    chai
      .request(app)
      .post("/addAgence")
      .set("Authorization", `Bearer ${token}`)
      .send(agence)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("/GET/:id agence", () => {
  it("it should GET a agence by the given id", (done) => {
    let agence = {
      name: "agence D",
      address: "gafsa, rdayef",
      city: "rdayef",
      phone_number: 74123456,
      created_at: "",
      updated_at: "",
      id: "6d200f70-f6a0-11eb-aea2-7f9266d5e075",
    };

    chai
      .request(app)
      .get("/agence/" + agence.id)
      .set("Authorization", `Bearer ${token}`)
      .send(agence)
      .end((err, res) => {
        if (!err) {
          res.should.have.status(200);
          res.body.should.be.a("object");

          done();
        }
      });
  });
});
