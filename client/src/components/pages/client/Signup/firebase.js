import * as firebase from 'firebase';

// my web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTO_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIRE_APP_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// firebase setings for email and link bak
const actionCodeSettings = {
  url: 'http://localhost:3000/signup',
  handleCodeInApp: true,
  iOS: {
    bundleId: 'http://localhost:3000/signup',
  },
  android: {
    packageName: 'http://localhost:3000/signup',
    installApp: true,
    minimumVersion: '12',
  },
  dynamicLinkDomain: 'fierbase.page.link',
};
// send email and save user data in local storage
const SubmitByEmail = (user) =>
  firebase
    .auth()
    .sendSignInLinkToEmail(user.email, actionCodeSettings)
    .then(() => {
      localStorage.setItem('User_Data', JSON.stringify(user));
    })
    .catch((error) => error);
// send mobile code and save user data in local storage

export default { firebase, SubmitByEmail };
