// Write your tests here
const server = require("./server");
const request = require("supertest");
const db = require("../data/dbConfig");
const jwtDecode = require("jwt-decode");

test("sanity", () => {
  expect(true).toBe(true);
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("users").truncate();
  // await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

it("process.env.BD_ENV must be testing", () => {
  //
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("register endpoint", () => {
  it("registers a new user", async () => {
    await request(server).post("/api/auth/register").send({
      username: "elisan",
      password: "1234",
    });
    const elisan = await db("users").where("username", "elisan").first();
    expect(elisan).toMatchObject({ id: 1 });
  });
  it("returns with status 201", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "elisan", password: "1234" });
    expect(res.status).toBe(201);
  });
});

describe("login endpoint", () => {
  it("responds with correct status code", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "elisan", password: "1234" });
    expect(res.status).toBe(401);
  });

  it("returns with the correct status message", async () => {
    const res = await request(server).post("/api/auth/login").send({
      username: "elisan",
      password: "1234",
    });
    // const elisan = await db("users").where("username", "elisan").first();
    expect(res.body.message).toMatch(/username and password required/i);
  });
});
