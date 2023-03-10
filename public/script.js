document.addEventListener("DOMContentLoaded", () => {
  // Add your code here to retrieve values from the sensors and update the interface
  const page1Button = document.getElementById("living-room-btn");
  const page2Button = document.getElementById("kitchen-btn");
  const page3Button = document.getElementById("bedroom-btn");
  const page1Container = document.getElementById("livingroom");
  const page2Container = document.getElementById("kitchen");
  const page3Container = document.getElementById("bedroom");
  
  page1Button.addEventListener("click", () => {
    page1Container.classList.add("show");
    page2Container.classList.remove("show");
    page3Container.classList.remove("show");
  });
  
  page2Button.addEventListener("click", () => {
    page1Container.classList.remove("show");
    page2Container.classList.add("show");
    page3Container.classList.remove("show");
  });
  
  page3Button.addEventListener("click", () => {
    page1Container.classList.remove("show");
    page2Container.classList.remove("show");
    page3Container.classList.add("show");
  });
  });
// Your web app's Firebase configuration
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


// Auto load Temperature-------------------------
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



	$(document).ready(function(){
    var database = firebase.database();
	  var Led1Status;

	database.ref("/TT_IoT/Led1Status").on("value", function(snapshot){
		Led1Status = snapshot.val();
		if(Led1Status == "1"){    // check from the firebase
			//$(".Light1Status").text("The light is off");
			document.getElementById("unact").style.display = "none";
			document.getElementById("act").style.display = "block";
      document.getElementById("d01_img").src = "./image/lamp-on.png"
		} else {
			//$(".Light1Status").text("The light is on");
			document.getElementById("unact").style.display = "block";
			document.getElementById("act").style.display = "none";
      document.getElementById("d01_img").src = "./image/lamp-off.png"
		}
	});

    $(".toggle-btn").click(function(){
		var firebaseRef = firebase.database().ref("TT_IoT/").child("Led1Status");

		if(Led1Status == "1"){    // post to firebase
			firebaseRef.set("0");
			Led1Status = "0";
		} else {
			firebaseRef.set("1");
			Led1Status = "1";
		}
	})
});

$(document).ready(function(){
  var database = firebase.database();
  var airCondision;
  database.ref("/TT_IoT/air-condition").on("value", function(snapshot){
  airCondision = snapshot.val();
  });
  $(".toggle").click(function(){
            var firebaseRef = firebase.database().ref("TT_IoT/").child("air-condition");
              if( airCondision == "1"){    
                    firebaseRef.set("0");
                    airCondision = "0";
              } else {
                    firebaseRef.set("1");
                    airCondision = "1";
              }
}); 
});

// $(".circle").onmouseover(function(){


// })