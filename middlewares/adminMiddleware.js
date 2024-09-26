const authAdmin = (req, res, next) => {
  console.log("Auth is getting checked");

  const token = "xyz";
  if (token == "xyz") {
    next();
  } else {
    res.status(401).send("Admin not authorized");
  }
};
const userAuth = (req, res, next) => {
  console.log("user auth is getting checked");

  const token = "xyz";
  if (token == "xyz") {
    next();
  } else {
    res.status(401).send("Admin not authorized");
  }
};

module.exports = {
  authAdmin,
  userAuth,
};
