import { Router } from 'express';
import * as Paths from './controllers/path_controller';
import * as Users from './controllers/user_controller';
import * as Orgs from './controllers/organisation_controller';
import * as mentors from './controllers/mentor_controller';
import { requireAuth, requireSignin } from './services/passport';
import { requireSigninOrg } from './services/passport_org';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

router.route('/signin/youth')
  .post(requireSignin, async (req, res) => {
    try {
      const token = await Users.signin(req.body);
      res.json({ token });
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
  });
router.route('/signin/org')
  .post(requireSigninOrg, async (req, res) => {
    try {
      const token = await Orgs.signin(req.body);
      res.json({ token });
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
  });
// signup
router.route('/signup/youth')
  .post(async (req, res) => {
    try {
      const result = await Users.signup(req.body);
      // we could have a helper method inside frontend's signup
      // that takes in the path and token and displays the info for that user?
      res.json(result);
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
  });
router.route('/signup/org')
  .post(async (req, res) => {
    try {
      const result = await Orgs.signup(req.body);
      // we could have a helper method inside frontend's signup
      // that takes in the path and token and displays the info for that user?
      res.json(result);
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
  });
router.route('/mentors')
  .post(async (req, res) => {
    try {
      const result = await mentors.getMentors(req.body);
      // we could have a helper method inside frontend's signup
      // that takes in the path and token and displays the info for that user?
      res.json(result);
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
  });
// send header from frontend for reqAuth
router.route('/profile/:userID')
  .get(requireAuth, async (req, res) => {
    try {
      const user = Users.updateProfile(req.params, req.body);
      // have a way for the user to add more optional fields
      res.json(user);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
router.route('/paths')
  .get(async (req, res) => {
    try {
      const paths = await Paths.getPaths();
      res.json(paths);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
export default router;
