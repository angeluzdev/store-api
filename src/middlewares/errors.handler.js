function isBoomError(error, req, res, next) {
  if(error.isBoom) {
    const pay = error.output.payload;
    return res.status(pay.statusCode).json(pay);
  }
  next(error);
}

function errorInternal(error, req, res ,next) {
  res.status(500).json({ error: error.message});
}

module.exports = {isBoomError, errorInternal};
