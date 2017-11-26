import firebase from "firebase";

var config = {
  apiKey: "AIzaSyCEwQlWCLIIpjqh-jtZaYAbx08dPV3r4EQ",
  authDomain: "wanderlist-32268.firebaseapp.com",
  databaseURL: "https://wanderlist-32268.firebaseio.com",
  projectId: "wanderlist-32268",
  storageBucket: "wanderlist-32268.appspot.com",
  messagingSenderId: "650106970497"
};

const fire = firebase.initializeApp(config);

export { fire };
