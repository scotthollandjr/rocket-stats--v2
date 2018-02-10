import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCzUDpQ1RnSYH3kdmvRRviNQEzyCUv6FQo",
  authDomain: "rocketplanet-d5934.firebaseapp.com",
  databaseURL: "https://rocketplanet-d5934.firebaseio.com",
  projectId: "rocketplanet-d5934",
  storageBucket: "rocketplanet-d5934.appspot.com",
  messagingSenderId: "543879339561"
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;
