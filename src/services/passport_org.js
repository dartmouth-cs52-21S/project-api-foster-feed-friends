// import { Passport } from 'passport';
// import LocalStrategy from 'passport-local';
// import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import dotenv from 'dotenv';
// import Organisation from '../models/organisation_model';

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
//   // should find org by email and check password
//   let org;
//   let isMatch;

//   try {
//     org = await Organisation.findOne({ email });
//     isMatch = await org.comparePassword(password);
//   } catch (error) {
//     console.log('hello');
//     return done(error);
//   }

//   if (!org) {
//     // no org with the email
//     return done(null, false);
//   } else if (!isMatch) {
//     // there is an org but the input password is not a match
//     return done(null, false);
//   } else {
//     // else there is a match for both email and password
//     return done(null, org);
//   }
// });

// const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
//   // is called with confirmed jwt we just need to confirm that org exits
//   let org;
//   try {
//     // verify the token and find the corresponding user
//     org = await Organisation.findById(payload.sub);
//   } catch (error) {
//     // in case of error
//     done(error, false);
//   }
//   if (org) {
//     // if there is a match
//     done(null, org);
//   } else {
//     // if there is no match for the token
//     done(null, false);
//   }
// });

// // Tell passport to use this strategy
// passport.use(jwtLogin); // for 'jwt'
// passport.use(localLogin); // for 'local'

// // middleware functions to use in routes
// export const requireAuthOrg = passport.authenticate('jwt', { session: false });
// export const requireSigninOrg = passport.authenticate('local', { session: false });
