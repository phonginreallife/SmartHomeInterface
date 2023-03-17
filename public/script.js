const firebaseConfig = {
  apiKey: "AIzaSyAMuREfO7bBb5_eLpFYnCSS71Qur7RHezg",
  authDomain: "smarthome-interface.firebaseapp.com",
  databaseURL: "https://smarthome-interface-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smarthome-interface",
  storageBucket: "smarthome-interface.appspot.com",
  messagingSenderId: "87457114680",
  appId: "1:87457114680:web:8123ba2fba8905e642d4cd",
  measurementId: "G-4BECG4N2W7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


firebase.database().ref("/TT_IoT/temperature").on("value",function(snapshot){
  var nd = snapshot.val();  
  document.getElementById("temp").innerHTML = nd;
  console.log(nd);
});
firebase.database().ref("/TT_IoT/huminity").on("value",function(snapshot){
  var nd = snapshot.val();  
  document.getElementById("hum").innerHTML = nd;
  console.log(nd);
});
firebase.database().ref("/TT_IoT/air-condition").on("value",function(snapshot){
  var nd = snapshot.val();  
  document.getElementById("air-condisioner").innerHTML = nd;
  console.log(nd);
});


$(document).ready(function() {
  var database = firebase.database();
  const leds = ["Led0","Led1", "Led2", "Led3", "Led4", "Led5", "Led6"];

  function updateStatus(led, status) {
    if (status == "1"){
      document.getElementById(`act${led}`).style.display = "block" ;
      document.getElementById(`unact${led}`).style.display ="none";
      document.getElementById(`witget${led}`).classList.add("border-show");
     if (led == 6){
      document.getElementById("d01_img").src = "./image/light-bulb.png";
      document.getElementById("living-image").src= "image/living-room.webp";
     }
    }
    else{
      document.getElementById(`act${led}`).style.display ="none";
      document.getElementById(`unact${led}`).style.display = "block";
      document.getElementById(`witget${led}`).classList.remove("border-show");
       if (led==6){
          document.getElementById("d01_img").src = "./image/idea.png";
          document.getElementById("living-image").src = "./image/black.webp";
      }
    }
    
  }
  
  database.ref("TT_IoT/").on("value", function(snapshot) {
    for (let i = 0; i < leds.length; i++) {
      var status = snapshot.val()[`${leds[i]}Status`];
      updateStatus(i, status);
    }
  });
  
  for (let i = 0; i < leds.length; i++) {
    $(`.toggle-btn${i}`).click(function() {
      var firebaseRef;
      var check_value;
      database.ref(`/TT_IoT/Led${i}Status`).on("value", function(snapshot){
          check_value = snapshot.val();
      });
      firebaseRef = firebase.database().ref("TT_IoT/").child(`/${leds[i]}Status`);
      // check_value = snapshot.val()[`${leds[i]}Status`];
      // firebaseRef.set(check_value == "1" ? "0" : "1");
      if(check_value == "1"){    // post to firebase
               firebaseRef.set("0");
               check_value = "0";
      } else {
              firebaseRef.set("1");
              check_value = "1";
              }
      }
  )};
});
document.addEventListener("DOMContentLoaded", () => {
  var page1Button = document.getElementById("living-room-btn");
  var page2Button = document.getElementById("kitchen-btn");
  var page3Button = document.getElementById("bedroom-btn");
  var page1Container = document.getElementById("livingroom");
  var page2Container = document.getElementById("kitchen");
  var page3Container = document.getElementById("bedroom");
  
  for (let i = 1; i < 4; i++) {
    let button = eval(`page${i}Button`);
    button.addEventListener("click", () => {
      for (let j = 1; j < 4; j++) {
        let container = eval(`page${j}Container`);
        document.getElementById("button-show").style.display = "none";
        if (j === i) {
          container.classList.add("show");
        } else {
          container.classList.remove("show");
        }
      }
    });
  }
});  
document.addEventListener("DOMContentLoaded", () => {
  var page4Button = document.getElementById("living-room-btn-2");
  var page5Button = document.getElementById("kitchen-btn-2");
  var page6Button = document.getElementById("bedroom-btn-2");
  var page4Container = document.getElementById("livingroom");
  var page5Container = document.getElementById("kitchen");
  var page6Container = document.getElementById("bedroom");
  for (let i = 4; i < 7; i++) {
    let button1 = eval(`page${i}Button`);
    button1.addEventListener("click", () => {
      for (let j = 4; j < 7; j++) {
        let container1 = eval(`page${j}Container`);
        if (j === i) {
          container1.classList.add("show");
        } else {
          container1.classList.remove("show");
        }
      }
    });
  }
})
