import firebase from 'firebase';
import * as config_file from './config';

const config = {
  apiKey: config_file.apiKey,
  authDomain: config_file.authDomain,
  databaseURL: config_file.databaseURL,
  projectId: config_file.projectId,
  storageBucket: config_file.storageBucket,
  messagingSenderId: config_file.messagingSenderId
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;
