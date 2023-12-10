module.exports = (error, req, res, next) => {
  console.error(error)
  req.flash('error', error.errorMessage || '發生錯誤')
  res.redirect('back')
  next(error)
}