const express = require("express");
const router = express();

router.use("/api/users", require("./UserRoutes"));

module.exports = router;
