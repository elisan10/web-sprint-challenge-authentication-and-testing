// 3- On FAILED registration due to `username` or `password` missing from the request body,
//       the response body should include a string exactly as follows: "username and password required".

// 4- On FAILED registration due to the `username` being taken,
//       the response body should include a string exactly as follows: "username taken".
const checkBodyExists = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(422).json({ message: "username and password required" });
  } else {
    next();
  }
};

module.exports = { checkBodyExists };
