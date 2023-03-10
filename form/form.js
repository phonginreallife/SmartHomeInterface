import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword,  createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
  const firebaseConfig = {
    apiKey: "AIzaSyB4mHotTY_kAtmQyAXNfpq1Y4puPrl3M0U",
    authDomain: "login-form-30c9c.firebaseapp.com",
    projectId: "login-form-30c9c",
    storageBucket: "login-form-30c9c.appspot.com",
    messagingSenderId: "713679951124",
    appId: "1:713679951124:web:bd03b9261844d9569ade01",
    measurementId: "G-3VQ3HD27P1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  const auth = getAuth(app);


  document.getElementById("reg-btn").addEventListener('click', function(){
   document.getElementById("register-div").style.display="block";
   document.getElementById("login-div").style.display="none";
});

document.getElementById("log-btn").addEventListener('click', function(){
 document.getElementById("register-div").style.display="none";
 document.getElementById("login-div").style.display="block";

});

  document.getElementById("login-btn").addEventListener('click', function(){
   const loginEmail= document.getElementById("login-email").value;
   const loginPassword =document.getElementById("login-password").value;

   signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  .then((userCredential) => {
    const user = userCredential.user;
    document.getElementById("result-correct-box").style.display="block";
    document.getElementById("result-error-box").style.display="none";
     document.getElementById("login-div").style.display="none";
     document.getElementById("result-in").innerHTML="Welcome <br>"+loginEmail+ " back to Smart Home Interface Management!";
  })  
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    document.getElementById("result-error-box").style.display="block";
    document.getElementById("result-correct-box").style.display="none";
     document.getElementById("login-div").style.display="none";
     document.getElementById("result-out").innerHTML="Sorry, Username unavaiable! <br>";

  });
});


  document.getElementById("register-btn").addEventListener('click', function(){

   const registerEmail= document.getElementById("register-email").value;
   const registerPassword =document.getElementById("register-password").value;

   createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
  .then((userCredential) => {
    const user = userCredential.user;
    document.getElementById("result-box").style.display="block";
     document.getElementById("register-div").style.display="none";
     document.getElementById("result-error-box").innerHTML="Welcome <br>"+registerEmail+" was Registered Successfully!";
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    document.getElementById("result-box").style.display="block";
     document.getElementById("register-div").style.display="none";
     document.getElementById("result").innerHTML="Sorry ! <br>"+ errorMessage;

  });
});


document.getElementById("log-in-btn").addEventListener('click', function(){
  signOut(auth).then(() => {
      window.location.href = "https://smarthome-interface.firebaseapp.com/";

  });
});
document.getElementById("log-out-btn").addEventListener('click', function(){
  signOut(auth).then(() => {
    document.getElementById("result-correct-box").style.display="none";
    document.getElementById("result-error-box").style.display="none";
    document.getElementById("login-div").style.display="";
  });
});