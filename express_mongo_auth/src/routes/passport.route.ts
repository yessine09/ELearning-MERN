// const passport = require('passport')
import passport from 'passport'

import { Router } from 'express'

const router = Router()

const CLIENT_URL = 'http://localhost:5173/'

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'successfull',
      user: req.user,
      //   cookies: req.cookies
    })
  }
})

router.get('/login/failed', (req, res) => {
  res.send(' wrong login! ')
  res.status(401).json({
    success: false,
    message: 'failure',
  })
})

// router.get('/logout', (req, res) => {
//   req.logout()
//   res.redirect(CLIENT_URL)
// })

//auth with google
router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))

//callback route for google  to redirect to
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/login/success', // Assurez-vous que ce chemin est correct
    failureRedirect: '/auth/login/failed',
  })
)

// router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: CLIENT_URL,
//     failureRedirect: "/login/failed",
//   })
// );

module.exports = router
