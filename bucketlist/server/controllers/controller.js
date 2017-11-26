// const data = require("../data/countriesdata.js");

module.exports = {
  getUsers: (req, res, next) => {
    const dbInstance = req.app.get("db");
    console.log(dbInstance);
    dbInstance
      .getUsers()
      .then(users => res.status(200).json(users))
      .catch(() => res.status(500).json());
  },

  getAllCountries: (req, res, next) => {
    const dbInstance = req.app.get("db");
    console.log("does dbInstance exist?", dbInstance);
    dbInstance
      .getAllCountries()
      .then(countries => res.status(200).json(countries))
      // .then(response => console.log(response))
      .catch(() => res.status(500).json());
  },

  addToBucketlist: (req, res, next) => {
    const { countryId, userId } = req.body;
    const dbInstance = req.app.get("db");
    dbInstance
      .addToBucketlist([countryid, userId])
      .then(updatedBucketlist => res.status(200).json(updatedBucketlist))
      .catch(() => res.status(500).json());
  },

  deleteFromBucketlist: (req, res, next) => {
    const { countryid, userId } = req.body;
    const dbInstance = req.app.get("db");
    dbInstance
      .deleteFromBucketlist([country_name, userId])
      .then(updatedBucketlist => res.status(200).json(updatedBucketlist))
      .catch(() => res.status(500).json());
  },

  addToVisited: (req, res, next) => {
    const { countryId, userId } = req.body;
    const dbInstance = req.app.get("db");
    dbInstance
      .addToVisited([countryId, userId])
      .then(updatedVisited => res.status(200).json(updatedVisited))
      .catch(() => res.status(500).json());
  },

  deleteFromVisited: (req, res, next) => {
    const { countryId, userId } = req.body;
    const dbInstance = req.app.get("db");
    dbInstance
      .deleteFromVisited([countryId, userId])
      .then(updatedVisited => {
        console.log("deteled from visited in db", req.body);
        res.status(200).json(updatedVisited);
      })
      .catch(() => res.status(500).json());
  },

  postPhoto: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { name, description, url } = req.body;
    dbInstance
      .postPhoto([name, description, url])
      .then(response => res.status(200).json(response))
      .catch(() => res.status(500).json());
  },

  getUserBucketList: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .getBucketlistByUserId([req.params.id])
      .then(response => res.status(200).json(response))
      .catch(() => res.status(500).json());
  },

  getCountriesByUserId: (req, res, next) => {
    const userId = req.params.id;
    let countriesByUserId = [];
    const dbInstance = req.app.get("db");
    dbInstance.getAllCountries().then(countrieslist => {
      countriesByUserId = countrieslist;
      dbInstance.getVisitedByUserId(userId).then(visitedCountries => {
        visitedCountries = visitedCountries.map(val => val.countryid);
        countriesByUserId = countriesByUserId.map((val, i) => {
          if (visitedCountries.includes(val.id)) {
            val.visited = true;
            return val;
          } else {
            val.visited = false;
            return val;
          }
        });

        dbInstance.getBucketlistByUserId(userId).then(bucketlistCountries => {
          console.log(bucketlistCountries);
          bucketlistCountries = bucketlistCountries.map(val => val.countryid);
          console.log(bucketlistCountries);

          countriesByUserId = countriesByUserId.map((val, i) => {
            if (bucketlistCountries.includes(val.id)) {
              val.bucketlist = true;
              return val;
            } else {
              val.bucketlist = false;
              return val;
            }
          });
          res.json(countriesByUserId);
        });
      });
    });
  }
};

// addCountries: (req, res, next) => {
//   const dbInstance = req.app.get("db");
//   for (let i = 0; i < data.length; i++) {
//     dbInstance
//       .addCountries([data[i].dataName, data[i].d])
//       .then(response => res.status(200).json(response))
//       .catch(() => res.status(500).json());
//   }
// }
