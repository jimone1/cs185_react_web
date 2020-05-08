import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyA2Dpjas3zIFynmcpHuqp2Qp6cyO8ZESs8",
  authDomain: "cs185project1.firebaseapp.com",
  databaseURL: "https://cs185project1.firebaseio.com",
  projectId: "cs185project1",
  storageBucket: "cs185project1.appspot.com",
  messagingSenderId: "920082782498",
  appId: "1:920082782498:web:3096812fb2efffd9da2d7b"
};
// Initialize Firebase
var fire = firebase.initializeApp(firebaseConfig);
export default fire;