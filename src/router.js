import { Router } from 'express';
import * as Paths from './controllers/path_controller';
import * as Users from './controllers/user_controller';
import * as Orgs from './controllers/organisation_controller';
import * as Mentors from './controllers/mentor_controller';
import * as Events from './controllers/event_controller';
import { requireAuth, requireSignin } from './services/passport';
import { requireAuthMentor, requireSigninMentor } from './services/passport_mentor';
import { requireSigninOrg, requireAuthOrg } from './services/passport_org';

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
    // res.json({ result, email: req.body.email });
    res.json(result);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signin/youth', requireSignin, async (req, res) => {
  console.log('hi from youth sign in');
  try {
    const token = await Users.signin(req.user);
    res.json({ token, ID: req.user.id });
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
  try {
    const token = await Orgs.signin(req.user);
    res.json({ token, ID: req.user.id });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signup/mentor', async (req, res) => {
  console.log('hi from router');
  try {
    const result = await Mentors.signup(req.body);
    // we could have a helper method inside frontend's signup
    // that takes in the path and token and displays the info for that user?
    // res.json({ result, email: req.body.email });
    res.json(result);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});
router.post('/signin/mentor', requireSigninMentor, async (req, res) => {
  console.log('hi from router');
  try {
    const token = await Mentors.signin(req.user);
    // we could have a helper method inside frontend's signup
    // that takes in the path and token and displays the info for that user?
    res.json({ token, ID: req.user.id });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.route('/orgs')
  .get(async (req, res) => {
    try {
      const org = await Orgs.getOrganisations();
      console.log(org);
      res.json(org);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.post('/addMentor', async (req, res) => {
  try {
    const result = await Mentors.signin(req.body);
    console.log(req.body);
    // we could have a helper method inside frontend's signup
    // that takes in the path and token and displays the info for that user?
    res.json({ result, email: req.body.email });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.route('/mentors')
  .get(async (req, res) => {
    try {
      const result = await Mentors.getMentors();
      // we could have a helper method inside frontend's signup
      // that takes in the path and token and displays the info for that user?
      res.json(result);
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
  });

router.route('/mentor/profile/:userID')
  .get(requireAuthMentor, async (req, res) => {
    console.log('Auth here');
    try {
      const mentor = await Mentors.getMentor(req.params.userID);
      res.json(mentor);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.route('/org/profile/:userID')
  .get(requireAuthOrg, async (req, res) => {
    try {
      const org = await Orgs.getOrganisation(req.params.userID);
      res.json(org);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.route('/youth/profile/:userID')
  .get(requireAuth, async (req, res) => {
    try {
      const user = await Users.getUser(req.params.userID);
      // have a way for the user to add more optional fields
      res.json(user);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
router.route('/org/profile/:userID/event')
  .post(requireAuthOrg, async (req, res) => {
    try {
      const event = await Events.createEvent(req.body);
      const events = await Orgs.getEvents(req.params.userID);
      events.push(event);
      const org = await Orgs.updateOrganisation(req.params.userID, { events });
      res.json(org);
    } catch (error) {
      res.status(500).json({ error });
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
router.route('/mentor/profile/:userID/edit')
  .put(requireAuthMentor, async (req, res) => {
    try {
      // const { user } = req;
      const result = await Mentors.updateMentor(req.params.userID, req.body);
      // have a way for the user to add more optional fields
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
// send header from frontend for reqAuth
router.route('/youth/profile/:userID/edit')
  .put(requireAuth, async (req, res) => {
    try {
      // const { user } = req;
      const result = await Users.updateUser(req.params.userID, req.body);
      // have a way for the user to add more optional fields
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
// send header from frontend for reqAuth
router.route('/org/profile/:userID/edit')
  .put(requireAuthMentor, async (req, res) => {
    try {
      // const { user } = req;
      const result = await Orgs.updateOrganisation(req.params.userID, req.body);
      // have a way for the user to add more optional fields
      res.json(result);
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

// curl -X GET "https://localhost:9090/api/mentor/60a91ad0b0d4feaa4d7297a7?"

// curl -X GET -H "Content-Type: application/json" -H "authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjE3MTEwMjg0OTJ9.BqxtuWDD0CdYpnjifJXkV_nc-UMtJVMptJ8rV0xZRNE" "http://localhost:9090/api/youth/60a91ad0b0d4feaa4d7297a7?"

// curl -X GET -H "Content-Type: application/json" -H "authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjE3MTEyMzg3NzZ9.CtPZovZbFeK2_B1Ra4bA0GEKMASFQR5-WN0nHwIGZCI" "http://localhost:9090/api/mentor/60a91ad0b0d4feaa4d7297a7?"
