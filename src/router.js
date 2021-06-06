import { Router } from 'express';
import * as Paths from './controllers/path_controller';
import * as Users from './controllers/user_controller';
// import * as Orgs from './controllers/organisation_controller';
// import * as Mentors from './controllers/mentor_controller';
import * as Events from './controllers/event_controller';
import * as Resource from './controllers/resource_controler';
import { requireAuth, requireSignin } from './services/passport';
// import { requireAuthMentor, requireSigninMentor } from './services/passport_mentor';
// import { requireSigninOrg, requireAuthOrg } from './services/passport_org';

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
    console.log(req.body);
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
    console.log(req.user);
    const token = await Users.signin(req.user);
    res.json({ token, ID: req.user.id });
  } catch (error) {
    console.log('hii');
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signup/org', async (req, res) => {
  try {
    const result = await Users.signup(req.body);
    // we could have a helper method inside frontend's signup
    // that takes in the path and token and displays the info for that user?
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});
router.post('/signin/org', requireSignin, async (req, res) => {
  try {
    const token = await Users.signin(req.user);
    res.json({ token, ID: req.user.id });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signup/mentor', async (req, res) => {
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
router.post('/signin/mentor', requireSignin, async (req, res) => {
  console.log('hi from router');
  try {
    const token = await Users.signin(req.user);
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
      const org = await Users.getOrganisations();
      console.log(org);
      res.json(org);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.route('/mentors')
  .get(async (req, res) => {
    try {
      const result = await Users.getMentors();
      // we could have a helper method inside frontend's signup
      // that takes in the path and token and displays the info for that user?
      res.json(result);
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
  });

router.route('/youths')
  .get(async (req, res) => {
    try {
      const result = await Users.getYouths();
      // we could have a helper method inside frontend's signup
      // that takes in the path and token and displays the info for that user?
      res.json(result);
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
  });

router.route('/mentor/profile/:userID')
  .get(async (req, res) => {
    console.log('Auth here');
    try {
      const mentor = await Users.getUser(req.params.userID);
      res.json(mentor);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.route('/org/profile/:userID')
  .get(async (req, res) => {
    try {
      console.log(req.params.userID);
      const org = await Users.getUser(req.params.userID);
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
      console.log(user);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
router.route('/org/profile/:userID/event')
  .post(requireAuth, async (req, res) => {
    try {
      const event = await Events.createEvent(req.body);
      const events = await Users.getEvents(req.params.userID);
      events.push(event);
      console.log(events);
      const org = await Users.updateUser(req.params.userID, { events });
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

router.route('/org/:userID/events')
  .get(async (req, res) => {
    try {
      // const { user } = req;
      const result = await Events.getEvents(req.params.userID);
      console.log(result);
      // have a way for the user to add more optional fields
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.route('/youth/:userID/messaged')
  .get(async (req, res) => {
    try {
      // const { user } = req;
      const result = await Users.getMessagedMentors(req.params.userID);
      console.log(result);
      // have a way for the user to add more optional fields
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.route('/org/:userID/event/:eventID')
  .get(requireAuth, async (req, res) => {
    try {
      // const { user } = req;
      console.log('req', req.params.eventID);
      // get a specific event
      const result = await Events.getEvent(req.params.eventID);
      // have a way for the user to add more optional fields
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.route('/org/:userID/event/:eventID/edit')
  .put(requireAuth, async (req, res) => {
    try {
      // const { user } = req;
      console.log('req', req.params.eventID);
      // get a specific event
      const result = await Events.updateEvent(req.params.eventID, req.body);
      // have a way for the user to add more optional fields
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.route('/org/:userID/event/:eventID/delete')
  .delete(requireAuth, async (req, res) => {
    try {
      // const { user } = req;
      console.log('req', req.params.eventID);
      // get a specific event
      const result = await Events.removeEvent(req.params.eventID);
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
router.route('/networks/resources')
  .get(async (req, res) => {
    try {
      const orgs = await Users.getOrganisations();
      res.json(orgs);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
router.route('/networks/mentors')
  .get(async (req, res) => {
    try {
      const mentors = await Users.getMentors();
      res.json(mentors);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
router.route('/networks/all')
  .get(async (req, res) => {
    try {
      const all = await Users.getAll();
      res.json(all);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.route('/submitResource')
  .post(async (req, res) => {
    try {
      console.log('we made it ');
      console.log(req.body);
      const result = await Resource.createResource(req.body);
      res.json(result);
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
  });

router.route('/resources')
  .get(async (req, res) => {
    try {
      const resource = await Resource.getResources();
      res.json(resource);
    } catch (error) {
      res.status(500).send({ error: error.toString() });
    }
  });
router.route('./youth/:userID/events')
  .get(requireAuth, async (req, res) => {
    try {
      const resource = await Events.getEvents(req.params.userID);
      res.json(resource);
    } catch (error) {
      res.status(500).send({ error: error.toString() });
    }
  });
router.route('/resources/:resourceID')
  .get(async (req, res) => {
    try {
      const resource = await Resource.getResource(req.params.resourceID);
      res.json(resource);
    } catch (error) {
      res.status(500).send({ error: error.toString() });
    }
  });
router.route('/youth/:userID/path/edit')
  .put(requireAuth, async (req, res) => {
    try {
      console.log(req.body);
      const result = await Users.updateUser(req.params.userID, req.body);
      // have a way for the user to add more optional fields
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
router.route('/mentor/:userID/path/edit')
  .put(requireAuth, async (req, res) => {
    try {
      console.log(req.body);
      const result = await Users.updateUser(req.params.userID, req.body);
      // have a way for the user to add more optional fields
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
router.route('/:userID/mentor')
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
export default router;

// curl -X GET "https://localhost:9090/api/mentor/60a91ad0b0d4feaa4d7297a7?"

// curl -X GET -H "Content-Type: application/json" -H "authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjE3MTEwMjg0OTJ9.BqxtuWDD0CdYpnjifJXkV_nc-UMtJVMptJ8rV0xZRNE" "http://localhost:9090/api/youth/60a91ad0b0d4feaa4d7297a7?"

// curl -X GET -H "Content-Type: application/json" -H "authorization: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MjE3MTEyMzg3NzZ9.CtPZovZbFeK2_B1Ra4bA0GEKMASFQR5-WN0nHwIGZCI" "http://localhost:9090/api/mentor/60a91ad0b0d4feaa4d7297a7?"
