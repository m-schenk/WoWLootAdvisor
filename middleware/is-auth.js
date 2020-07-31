module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
      return res.redirect('https://discord.com/api/oauth2/authorize?client_id=734533006114553866&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdiscord%2Fsuccess&response_type=code&scope=identify%20guilds%20email');
  }
  next();
}