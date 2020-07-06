import * as firebase from 'firebase';

// my web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAJCTmsmuDI4AbT377IBTNvCDSv5QNlnGQ',
  authDomain: 'testcall-58a86.firebaseapp.com',
  databaseURL: 'https://testcall-58a86.firebaseio.com',
  projectId: 'testcall-58a86',
  storageBucket: 'testcall-58a86.appspot.com',
  messagingSenderId: '152667190733',
  appId: '152667190733:web:1fa51d46850ea902d88084',
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
