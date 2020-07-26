exports.getValue = (req, res, next) => {
  res.status(200).json({ value: 12 });
}