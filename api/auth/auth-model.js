const db = require("../../data/dbConfig");

function findBy(condition) {
  return db("users").where(condition);
}

function findById(id) {
  return db("users").where("id", id).first();
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

module.exports = {
  findBy,
  findById,
  add,
};
