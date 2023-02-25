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
// // Example values for the sensors
// var temperature = 25;
// var humidity = 50;
// var gas = 100;
// var light = true;

// // Example values for the devices
// var devices = [
//   { name: 'Device 1', value: 50 },
//   { name: 'Device 2', value: 75 },
//   { name: 'Device 3', value: 25 },
//   { name: 'Device 4', value: 0 },
//   { name: 'Device 5', value: 100 },
//   { name: 'Device 6', value: 50 }
// ];


// // Function to update the sensor values in the interface
// function updateSensors() {
//   document.getElementById('temperature-value').innerHTML = temperature + '°C';
//   document.getElementById('humidity-value').innerHTML = humidity + '%';
//   document.getElementById('gas-value').innerHTML = gas + ' ppm';
//   document.getElementById('light-value').innerHTML = light ? 'On' : 'Off';
// }

// // Function to update the device values in the interface
// function updateDevices() {
//   for (var i = 0; i < devices.length; i++) {
//     var device = devices[i];
//     var slider = document.getElementById('device-' + (i + 1) + '-slider');
//     slider.value = device.value;
//     document.getElementById('device-' + (i + 1) + '-value').innerHTML = device.value + '%';
//   }
// }

// // Call the update functions when the page loads
// window.onload = function() {
//   updateSensors();
//   updateDevices();
// };
