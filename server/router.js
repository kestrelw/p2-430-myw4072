const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getStars', mid.requiresLogin, controllers.Star.getStars);
  app.get('/getLogin', mid.requiresLogin, controllers.Star.getLogin);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  // app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);
  // app.post('/maker', mid.requiresLogin, controllers.Domo.makeDomo);

  app.get('/maker', mid.requiresLogin, controllers.Star.starPage);
  app.post('/maker', mid.requiresLogin, controllers.Star.makeStar);

  // app.get('/starcall', mid.requiresLogin, controllers.Star.starPage);
  // app.post('/starcall', mid.requiresLogin, controllers.Star.makeStar);
  app.get('/inventory', mid.requiresLogin, controllers.Star.inventoryPage);

  app.get('/history', mid.requiresLogin, controllers.Star.historyPage);
  app.get('/profile', mid.requiresLogin, controllers.Star.profilePage);
  
  app.get('/changepassword', mid.requiresLogin, controllers.Star.changePasswordPage);
  app.post('/changepassword', mid.requiresLogin, controllers.Star.changePassword);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);

  app.all('*', (req, res) => {
    res.redirect('/'); // Redirect to the maker/login page
  });
};

module.exports = router;
