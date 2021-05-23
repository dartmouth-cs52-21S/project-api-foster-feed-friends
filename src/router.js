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
router.get('/test', (req, res) => {
  res.json({ message: 'welcome to our blog api yayayy!' });
});
// signup
router.post('/signup/youth', async (req, res) => {
  console.log('hi from router');
  try {
    const result = await Users.signup(req.body);
    // we could have a helper method inside frontend's signup
    // that takes in the path and token and displays the info for that user?
    res.json({ result, email: req.body.email });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signin/youth', requireSignin, async (req, res) => {
  console.log('hi from youth sign in');
  try {
    const token = await Users.signin(req.body);
    res.json({ token });
  } catch (error) {
    console.log('hii');
    res.status(422).send({ error: error.toString() });
  }
});
router.post('/signup/org', async (req, res) => {
  try {
    const result = await Orgs.signup(req.body);
    // we could have a helper method inside frontend's signup
    // that takes in the path and token and displays the info for that user?
    res.json(result);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});
router.post('/signin/org', requireSigninOrg, async (req, res) => {
  console.log('hello from youth signin');
  try {
    const token = await Orgs.signin(req.body);
    res.json({ token });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});
router.post('/addMentor', async (req, res) => {
  try {
    const mentor = await mentors.createMentor(req.body);
    res.json(mentor);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});
router.route('/mentors')
  .post(async (req, res) => {
    try {
      const result = await mentors.getMentors();
      // we could have a helper method inside frontend's signup
      // that takes in the path and token and displays the info for that user?
      res.json(result);
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
  });
router.route('/addPath')
  .post(async (req, res) => {
    try {
      const result = await Paths.createPath(req.body);
      // we could have a helper method inside frontend's signup
      // that takes in the path and token and displays the info for that user?
      res.json(result);
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
  });

// send header from frontend for reqAuth
router.route('/youth/profile/:userID')
  .get(requireAuth, async (req, res) => {
    try {
      const user = Users.updateProfile(req.params.id, req.body);
      // have a way for the user to add more optional fields
      res.json(user);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

// router.route('/mentors')
//   .get(async (req, res) => {
//     try {
//       const result = await Mentors.getMentors();
//       // we could have a helper method inside frontend's signup
//       // that takes in the path and token and displays the info for that user?
//       res.json(result);
//     } catch (error) {
//       res.status(422).send({ error: error.toString() });
//     }
//   });

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
