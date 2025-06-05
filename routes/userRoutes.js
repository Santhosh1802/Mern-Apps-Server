const { SignUpUser, LoginUser } = require("../controllers/userController");

const router = require("express").Router();

router.post("/signup", SignUpUser);
router.post("/login", LoginUser);

module.exports = router;
