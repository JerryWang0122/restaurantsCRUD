module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.userName = req.user.name || `會員 ${req.user.id}`
    return next()
  }
  req.flash('error', '尚未登入')
  res.redirect('/login')
}