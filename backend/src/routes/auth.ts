import express from 'express';
import passport from 'passport';

const router = express.Router();

router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true,
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

export default router;
