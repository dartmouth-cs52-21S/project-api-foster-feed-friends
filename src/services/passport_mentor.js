// import { Passport } from 'passport';
// import LocalStrategy from 'passport-local';
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import dotenv from 'dotenv';
// import Mentor from '../models/mentor_model';

// // loads in .env file if needed
// dotenv.config({ silent: true });

// // options for local strategy, we'll use email AS the username
// // not have separate ones
// const localOptions = { usernameField: 'email' };
// const passport = new Passport();
// // options for jwt strategy
// // we'll pass in the jwt in an `authorization` header
// // so passport can find it there
// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromHeader('authorization'),
//   secretOrKey: process.env.AUTH_SECRET,
// };
// // NOTE: we are not calling this a bearer token (although it technically is), if you see people use Bearer in front of token on the internet you could either ignore it, use it but then you have to parse it out here as well as prepend it on the frontend.
// // username/email + password authentication strategy
// const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
//   // should find mentor by email and check password
//   let mentor;
//   let isMatch;

//   try {
//     mentor = await Mentor.findOne({ email });
//     console.log(`mentor is: ${mentor}`);
//     isMatch = await mentor.comparePassword(password);
//     // if there is error in finding the mentor or comparing passwords
//   } catch (error) {
//     return done(error);
//   }

//   if (!mentor) {
//     // if there is no mentor with the particular email
//     return done(null, false);
//     // if the password given does not match the expected
//   } else if (!isMatch) {
//     return done(null, false);
//   } else {
//     // if there is a match for both email and password
//     return done(null, mentor);
//   }
// });

// const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
//   // is called with confirmed jwt we just need to confirm that mentor exits
//   let mentor;
//   //   console.log(payload);
//   //   console.log(payload.sub);
//   console.log(jwtOptions);
//   console.log(`done is ${done}`);
//   try {
//     // find a mentor that matches the token
//     mentor = await Mentor.findById(payload.sub);
//   } catch (error) {
//     done(error, false);
//   }
//   // if found
//   if (mentor) {
//     done(null, mentor);
//   } else {
//     // if there is no mentor with that token
//     done(null, false);
//   }
// });

// // Tell passport to use this strategy
// passport.use(jwtLogin); // for 'jwt'
// passport.use(localLogin); // for 'local'

// // middleware functions to use in routes
// export const requireAuthMentor = passport.authenticate('jwt', { session: false });
// export const requireSigninMentor = passport.authenticate('local', { session: false });
