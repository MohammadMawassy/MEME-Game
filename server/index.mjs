// imports
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {check, validationResult} from 'express-validator';


import * as historyDao from './dao-history.mjs';
import * as itemDao from './dao-items.mjs';
import { getUser } from './dao-users.mjs';
import { getRandomCaptionsExcluding, getRelatedCaptionsForItem } from './dao-captions.mjs';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';

// init express
const app = new express();
const port = 3001;

// middleware
app.use(express.json());
app.use(morgan('dev'));
// set up and enable CORS -- UPDATED
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));

passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await getUser(username, password);
  if(!user)
    return cb(null, false, 'Incorrect username or password.');
    
  return cb(null, user);
}));


passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) { 
  return cb(null, user);
  // if needed, we can do extra check here (e.g., double check that the user is still in the database, etc.)
});

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    console.log('User is authenticated',req)
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}

app.use(session({
  secret: "shhhhh... it's a secret!!!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));


// POST /api/sessions
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        // display wrong login messages
        return res.status(401).send(info);
      }
      // success, perform the login
      req.login(user, (err) => {
        if (err)
          return next(err);
        // req.user contains the authenticated user, we send all the user info back
        return res.status(201).json(req.user);
      });
  })(req, res, next);
});

// GET /api/sessions/current -- NEW
app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.json(req.user);}
  else
    res.status(401).json({error: 'Not authenticated'});
});

// DELETE /api/session/current -- NEW
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.end();
  });
});

app.get('/items/:isLoggedIn',
  async (req, res) => {
    try {
      const loggedIn = req.params.isLoggedIn === 'true';
      const result = await itemDao.listItems(loggedIn)
      if (result.error)
        res.status(404).json(result);
      else
        res.json(result);
    } catch (err) {
      res.status(500).end();
    }
  }
);

app.get('/captions/:itemId',
  async (req, res) => {
    try {
      const result = await getRelatedCaptionsForItem(req.params.itemId)
      if (result.error)
        res.status(404).json(result);
      else
        res.json(result);
    } catch (err) {
      res.status(500).end();
    }
  }
);

app.get('/captions/random/:captionIds',
  async (req, res) => {
    try {
      const captionIds = req.params.captionIds.split(',');
      const result = await getRandomCaptionsExcluding(captionIds);
      if (result.error)
        res.status(404).json(result);
      else
        res.json(result);
    } catch (err) {
      res.status(500).end();
    }
  }
);

app.post('/history/store',isLoggedIn,
  [
    // Validation middleware
    check('gameResult.GameScore').isIn([0, 5]).withMessage('Score must be either 0 or 5'),
    check('gameResult.score').isInt({ min: 0, max: 5 }).withMessage('Score must be between 0 and 5'),
    
  ],
  async (req, res) => {
    const history = {
      date: new Date(req.body.gameResult['date']),
      meme: req.body.gameResult['meme'], 
      score: req.body.gameResult['score'],
      totalScore: req.body.gameResult['GameScore'],
      user: req.user.id  // user is overwritten with the id of the user that is doing the request and it is logged in
    };

    try {
      const result = await historyDao.createHistory(history); // NOTE: createFilm returns the new created object
      res.status(200).json({ message: "created" });
    } catch (err) {
      res.status(504).json({ error: `Database error during the creation of new history: ${err}` });
    }
  }
);

app.get('/history/get',
  isLoggedIn,
  async (req, res) => {
    try {
      const result = await historyDao.getUserHistory(req.user.id);
      if (result.error)
        res.status(404).json(result);
      else
        res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
);

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});