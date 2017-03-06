const express = require('express');

const router = express.Router();

const passport = require('../server/config/passport');

router.post('/login',

  function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      console.log('AUTH USER >>>>>>', user)
      if (err) { return next(err); }
      if (!user) { res.status(401).end(); return; }
      req.logIn(user, function(err) {
        if (err) { res.status(401).end(); return; }
        // res.send(JSON.stringify(user)).end();

        res.send(`https://culture-vault.herokuapp.com/users/${user.id}`)
      });
    })(req, res, next);
  })

router.get('/logout', function (req, res) {
      console.log('<====== LOG OUT USER ======>')
      req.logout();
      req.session.destroy();
      res.send(`https://culture-vault.herokuapp.com/`)
});

module.exports = router
