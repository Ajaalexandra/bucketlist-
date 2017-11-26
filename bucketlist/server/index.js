const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const session = require("express-session");
const connectionString = require("../config.js").massive;
const controller = require("./controllers/controller");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");

const { dbUser, database } = require("../config").massive;
const { secret } = require("../config").session;
const { domain, clientID, clientSecret } = require("../config.js").auth0;

const app = express();
const port = 3001;

//MIDDLEWARE
app.use(json());
app.use(cors());

massive(connectionString)
  .then(dbInstance => app.set("db", dbInstance))
  .catch(console.log);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain,
      clientID,
      clientSecret,
      callbackURL: "/login"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      // console.log(profile);
      app
        .get("db")
        .getUserByAuthId(profile.id)
        .then(response => {
          // console.log(response);
          if (!response[0]) {
            app
              .get("db")
              .createUserByAuth([profile.id, profile.displayName])
              .then(created => {
                // console.log(created);
                return done(null, created[0]);
              });
          } else {
            return done(null, response[0]);
          }
        });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

//ENDPOINTS

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/int-map"
  })
);

app.get("/api/me", controller.getUsers);
app.get("/api/countries", controller.getAllCountries);
app.post("/api/bucketlist", controller.addToBucketlist);
app.post("/api/bucketlist/remove", controller.deleteFromBucketlist);
app.post("/api/visited", controller.addToVisited);
app.post("/api/visited/remove", controller.deleteFromVisited);
// app.post("/api/photo", controller.postPhoto);
app.get("/api/countries/:id", controller.getCountriesByUserId);
app.post("/api/uploads", controller.postPhoto);
app.get("/api/bucketlist/:id", controller.getUserBucketList);
// app.post("/api/countriesdata", controller.addCountries);
app.get("/me", function(req, res) {
  if (!req.user) {
    return res.status(404);
  }
  res.status(200).json(req.user);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
