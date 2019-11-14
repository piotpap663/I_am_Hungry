module.exports = function(req, res) {
  req.logout();
  res.redirect('localhost:8080/');
};
