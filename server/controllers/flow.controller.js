const Flow = require("../models/Flow");

exports.createFlow = async (req, res) => {
  const flow = await Flow.create({
    ...req.body,
    userId: req.user.id,
  });

  res.json(flow);
};

exports.getFlows = async (req, res) => {
  const flows = await Flow.find({ userId: req.user.id });
  res.json(flows);
};

exports.getFlow = async (req, res) => {
  const flow = await Flow.findById(req.params.id);
  res.json(flow);
};

exports.updateFlow = async (req, res) => {
  const flow = await Flow.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(flow);
};

exports.deleteFlow = async (req, res) => {
  await Flow.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

exports.activateFlow = async (req, res) => {
  await Flow.updateMany(
    { userId: req.user.id },
    { isActive: false }
  );

  const flow = await Flow.findByIdAndUpdate(
    req.params.id,
    { isActive: true },
    { new: true }
  );

  res.json(flow);
};
