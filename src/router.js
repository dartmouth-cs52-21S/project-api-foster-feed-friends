import { Router } from 'express';
import * as Paths from './controllers/path_controller';
import * as Users from './controllers/user_controller';
import * as Events from './controllers/event_controller';
import * as Resource from './controllers/resource_controler';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();
/* home */
router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});
/* signup for youth, org and mentor */
router.post('/signup/youth', async (req, res) => {
  try {
    const result = await Users.signup(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signup/org', async (req, res) => {
  try {
    const result = await Users.signup(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});

router.post('/signup/mentor', async (req, res) => {
  try {
    const result = await Users.signup(req.body);
    res.json(result);
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});
/* signin for youth, org and mentor */
router.post('/signin/youth', requireSignin, async (req, res) => {
  try {
    const token = await Users.signin(req.user);
    res.json({ token, ID: req.user.id });
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

router.post('/signin/mentor', requireSignin, async (req, res) => {
  try {
    const token = await Users.signin(req.user);
    res.json({ token, ID: req.user.id });
  } catch (error) {
    res.status(422).send({ error: error.toString() });
  }
});
/* routes for all youths, orgs and mentors */
router.route('/youths')
  .get(async (req, res) => {
    try {
      const result = await Users.getYouths();
      res.json(result);
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
  });
router.route('/orgs')
  .get(async (req, res) => {
    try {
      const org = await Users.getOrganisations();
      res.json(org);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.route('/mentors')
  .get(async (req, res) => {
    try {
      const result = await Users.getMentors();
      res.json(result);
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
  });
/* routes for profiles for youth, org and mentor */
router.route('/mentor/profile/:userID')
  .get(async (req, res) => {
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
      res.json(user);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
/* routes for editing youth, org and mentor profiles */
router.route('/mentor/profile/:userID/edit')
  .put(requireAuth, async (req, res) => {
    try {
      const result = await Users.updateUser(req.params.userID, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.route('/youth/profile/:userID/edit')
  .put(requireAuth, async (req, res) => {
    try {
      const result = await Users.updateUser(req.params.userID, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });

router.route('/org/profile/:userID/edit')
  .put(requireAuth, async (req, res) => {
    try {
      const result = await Users.updateUser(req.params.userID, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
/* routes for all events, one event, creating an event, editing an event and deleting an event */
router.route('/org/:userID/events')
  .get(async (req, res) => {
    try {
      const result = await Events.getEvents(req.params.userID);
      res.json(result);
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
      const org = await Users.updateUser(req.params.userID, { events });
      res.json(org);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
router.route('/org/:userID/event/:eventID/add')
  .put(requireAuth, async (req, res) => {
    try {
      // get a specific event
      const result = await Users.updateUser(req.params.userID, req.body);
      // have a way for the user to add more optional fields
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
router.route('/org/:userID/event/:eventID')
  .get(requireAuth, async (req, res) => {
    try {
      const result = await Events.getEvent(req.params.eventID);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
router.route('/youth/:userID/events')
  .get(requireAuth, async (req, res) => {
    try {
      const events = await Events.getEvents(req.params.userID);
      res.json(events);
    } catch (error) {
      res.status(500).send({ error: error.toString() });
    }
  });
router.route('/org/:userID/event/:eventID/edit')
  .put(requireAuth, async (req, res) => {
    try {
      const result = await Events.updateEvent(req.params.eventID, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
router.route('/org/:userID/event/:eventID/delete')
  .delete(requireAuth, async (req, res) => {
    try {
      const result = await Events.removeEvent(req.params.eventID);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
router.route('/addPath')
  .post(async (req, res) => {
    try {
      const result = await Paths.createPath(req.body);
      res.json(result);
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
  });

router.route('/youth/:userID/messaged')
  .get(async (req, res) => {
    try {
      const result = await Users.getMessagedMentors(req.params.userID);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
/* routes for networks resources (mentors, orgs and all) */
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
/* routes for resources */
router.route('/submitResource')
  .post(async (req, res) => {
    try {
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

router.route('/resources/:resourceID')
  .get(async (req, res) => {
    try {
      const resource = await Resource.getResource(req.params.resourceID);
      res.json(resource);
    } catch (error) {
      res.status(500).send({ error: error.toString() });
    }
  });
/* routes for path */
router.route('/youth/:userID/path/edit')
  .put(requireAuth, async (req, res) => {
    try {
      const result = await Users.updateUser(req.params.userID, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
router.route('/mentor/:userID/path/edit')
  .put(requireAuth, async (req, res) => {
    try {
      const result = await Users.updateUser(req.params.userID, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
router.route('/:userID/mentor')
  .put(requireAuth, async (req, res) => {
    try {
      const result = await Users.updateUser(req.params.userID, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
export default router;
