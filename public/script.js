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
var page4Button = document.getElementById("living-room-btn-2");
var page5Button = document.getElementById("kitchen-btn-2");
var page6Button = document.getElementById("bedroom-btn-2");
var page4Container = document.getElementById("livingroom");
var page5Container = document.getElementById("kitchen");
var page6Container = document.getElementById("bedroom");

$(document).ready(function() {
  var database = firebase.database();
  const leds = ["thietbi0","thietbi1", "thietbi2", "thietbi3", "thietbi4", "thietbi5", "thietbi6"];

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
  
  database.ref("TT_IoT/Devices").on("value", function(snapshot) {
    for (let i = 0; i < leds.length; i++) {
      var status = snapshot.val()[`${leds[i]}`];
      updateStatus(i, status);
    }
  });
  
  for (let i = 0; i < leds.length; i++) {
    $(`.toggle-btn${i}`).click(function() {
      var firebaseRef;
      var check_value;
      database.ref(`/TT_IoT/Devices/thietbi${i}`).on("value", function(snapshot){
          check_value = snapshot.val();
      });
      firebaseRef = firebase.database().ref("TT_IoT/Devices").child(`/${leds[i]}`);
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
  hello = document.getElementById("helloworld");
  for (let i = 4; i < 7; i++) {
    let button1 = eval(`page${i}Button`);
    button1.addEventListener("click", () => {
      for (let j = 4; j < 7; j++) {
        let container1 = eval(`page${j}Container`);
        hello.style.display = "none";
        if (j === i) {
          container1.classList.add("show");
          if (i===4){
            document.getElementById("living-image").src = "./image/living-room.webp";
            document.getElementById("content-temp").src = "./image/high-temperature-gradient-circle-glyph-inverted-icon-vector.webp";
            document.getElementById("content-hum").src = "./image//humidity-gradient-circle-glyph-inverted-icon-vector.jpg";
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
          }
          if (i===5){
            document.getElementById("living-image").src = "./image/kitchen1.png";
            document.getElementById("content-hum").src = "./image/carbon-monoxide.png";
            document.getElementById("content-temp").src = "./image/fire-button.png";
            document.getElementById("hum").innerHTML = "1000 ppm";
            document.getElementById("temp").innerHTML = "OFF";
          }
          if (i===6){
            document.getElementById("living-image").src = "./image/bedroom4.jpg";
            document.getElementById("content-temp").src = "./image/cctv-cam.png";
            document.getElementById("content-hum").src = "./image/fire.png";
            document.getElementById("hum").innerHTML = "Tracking";
            document.getElementById("temp").innerHTML = "Tracking";
          }
        } else {
          container1.classList.remove("show");
        }
      }
    });
  }
})
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];       
var today = new Date();
today.setTime(today.getTime());       
document.getElementById("day").innerHTML = today.getDate();
document.getElementById("month").innerHTML = months[today.getMonth()];
// document.getElementById("hour").innerHTML = today.getTime();


function updateClock() {
    // Get the current date and time
    const now = new Date();
    
    // Display the local time in the "hour" span element
    const hourSpan = document.getElementById("hour");
    hourSpan.textContent = now.toLocaleTimeString();
    
   ;
  }

  setInterval(updateClock, 1000);
  var sliderAir = document.getElementById("sliderAir");
  var SelectValue = document.getElementById("SelectValue");
  var sliderAudio = document.getElementById("sliderAudio");
  var AudioValue = document.getElementById("AudioValue"); /* create variable*/
  SelectValue.innerHTML = sliderAir.value; /* get value from slider id in HTML but the value unable to change*/
  AudioValue.innerHTML = sliderAudio.value;
  //--------------get value from firebase to show it when first run (sync between html and firebase)
  var database = firebase.database();
  database.ref("TT_IoT/").on("value", function(snap){      
  //get value blueValue from firebase and store to  SelectValueBlue.innerHTML	
    
    sliderAir.value = snap.val().Aircondition;           
    SelectValue.innerHTML = snap.val().Aircondition;
    sliderAudio.value = snap.val().AudioVolume;           
    AudioValue.innerHTML = snap.val().AudioVolume;   
    
  });
  sliderAir.oninput = function(){
      SelectValue.innerHTML = this.value; /* able to change the value*/
      var firebaseRef = firebase.database().ref("TT_IoT/").child("Aircondition");
      firebaseRef.set(sliderAir.value);           
  
  }
  sliderAudio.oninput = function(){
    SelectValue.innerHTML = this.value; /* able to change the value*/
    var firebaseRef = firebase.database().ref("TT_IoT/").child("AudioVolume");
    firebaseRef.set(sliderAudio.value);           

}