import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Profile } from 'passport'
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/user')
const DAOUser = require('../models/dao/user.dao').default
const generator = require('generate-password');


// Load environment variables from .env file
dotenv.config()

const GOOGLE_CLIENT_ID = process.env.CLIENT_ID || ''
const GOOGLE_CLIENT_SECRET = process.env.CLIENT_SECRET || ''

const defaultRole= ""

const password = generator.generate({
	length: 10,
	numbers: true,
  uppercase: true
});

console.log(password);


// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: '/auth/google/callback',
//       passReqToCallback: true,
//     },
//     async (
//       req: Request,
//       res: any,
//       accessToken: string,
//       refreshToken: string,
//       profile: Profile,
//       done: any
//     ) => {
//       try {
//         console.log('profile', profile)
//         console.log('passport reached')

//         // Check if profile.emails is defined before accessing its properties
//         const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : ''

//         // i want to add new User to databse here!

//         // Create a new user object based on the Google profile
//         const newUser = {
//           email: email, // Adjust this based on your Google profile structure
//           password: '', // Set a default password or handle it as per your logic
//           firstName: profile.name?.givenName || '',
//           lastName: profile.name?.familyName || '',
//           verified: true, // Set as per your logic
//           roles: [], // Set as per your logic
//         }
//         // Add the new user to the database using the DAOUser class
//         const createdUser = await DAOUser.createUser(newUser)

//         // Log the created user
//         console.log('New user created:', createdUser)
//         // Continue with Passport authentication if necessary
//         done(null, createdUser)
//       } catch (error) {
//         console.error(error)
//         done(error, null)
//       }
//     }
//   )
// )
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      passReqToCallback: true,
    },
    async (
      req: Request,
      res: any,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: any
    ) => {
      try {
        console.log('profile of user : ', profile)
        console.log('passport reached !')
        //const userId = profile.id
        const emailUser = profile.emails && profile.emails[0]?.value
        console.log('profile.emails : ', profile.emails)
        console.log('profile.emails?.values : ', profile.emails?.values)

        console.log('emailUser : ', emailUser)

        const typeOfprofileEmail = typeof emailUser
        console.log('type of profile id of google is', typeOfprofileEmail)

        // Check if the user already exists in your database
        const existingUser = (await DAOUser.getUserByEmail(emailUser)) || ''

        console.log('Email of user :', emailUser)
        console.log('getUserInfo:', existingUser)

        if (existingUser) {
          console.log('user exist !')
          // If the user already exists, you might want to log them in or handle it accordingly
          return done(null, existingUser)
        } else {
          console.log('u gona create new user!')
          const newUser = {
            email: (profile.emails && profile.emails[0]?.value) || '',
            password: password || '', // Set a default password or handle it as per your logic
            firstName: profile.name?.givenName || '',
            lastName: profile.name?.familyName || '',
            verified: false, // Set as per your logic

            roles: [], // Set as per your logic
          }

          // Add the new user to the database using the DAOUser class
          const createdUser = await DAOUser.createUser(newUser)

          // Log the created user
          console.log('New user created:', createdUser)

          // Now, you can use the createdUser or perform any other actions as needed

          // Continue with Passport authentication
          return done(null, createdUser)
        }
      } catch (error) {
        console.error(error)
        return done(error, null)
      }
    }
  )
)

passport.serializeUser((user: any, done: any) => {
  done(null, user)
})

passport.deserializeUser((user: any, done: any) => {
  done(null, user)
})
export default passport

// new User({
//   firstName: profile.name?.givenName,
//   lastName: profile.name?.familyName,
// })
//   .save()
//   .then((newUser: any) => {
//     console.log('new user', newUser)
//   })
// console.log('aa')

//-----------------------

// new User({
//   email: '',
//   password: '',
//   firstName: profile.name?.givenName,
//   lastName: profile.name?.familyName,
//   verified: true,
//   roles: '',
// })
// const newUser = await new User({
//   email: '',
//   password: '',
//   firstName: profile.name?.givenName,
//   lastName: profile.name?.familyName,
//   verified: true,
//   roles: [],
// }).save()
// console.log('new user created', newUser)
// // Assuming you want to send a JSON response indicating success
// res.json({ message: 'User created successfully', user: newUser })
// .then((newUser: any) => {
//   console.log('new user created', newUser)
//   done(null, newUser)
// })

//------------------------------

// async (req: Request, accessToken: string, refreshToken: string, profile: any, done: any) => {
//   console.log('profile', profile)

//   try {
//     // Check if the user already exists in the database
//     const existingUser = await User.findOne({ email: profile.email })

//     if (existingUser) {
//       // User already exists, return the existing user
//       return done(null, existingUser)
//     }

//     // User doesn't exist, create a new user
//     const newUser: PartialUser = {
//       email: profile.email,
//       // Other fields from the profile that you want to save
//     }

//     const createdUser = await User.create(newUser)
//     return done(null, createdUser)
//   } catch (error) {
//     return done(error)
//   }
// }
//6439578a409a737a9c3f3bc0
