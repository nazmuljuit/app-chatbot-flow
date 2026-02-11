const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createFlow,
  getFlows,
  getFlow,
  updateFlow,
  deleteFlow,
  activateFlow,
} = require("../controllers/flow.controller");

router.use(auth);

router.post("/", createFlow);
router.get("/", getFlows);
router.get("/:id", getFlow);
router.put("/:id", updateFlow);
router.delete("/:id", deleteFlow);
router.put("/:id/activate", activateFlow);

module.exports = router;
