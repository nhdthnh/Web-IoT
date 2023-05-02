// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSifplvm1YpPh4YDTxsAWQhatr6eZOL2w",
  authDomain: "fir-faabf.firebaseapp.com",
  databaseURL: "https://fir-faabf-default-rtdb.firebaseio.com",
  projectId: "fir-faabf",
  storageBucket: "fir-faabf.appspot.com",
  messagingSenderId: "843845351769",
  appId: "1:843845351769:web:5ee961a85c77f38acc7448",
  measurementId: "G-X6C3WFDQ24"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.database().ref("/TT_IoT/nhietdo").on("value",function(snapshot){
  var nd = snapshot.val();  
  document.getElementById("nhietdo").innerHTML = nd;

  var ndstate = document.getElementById("ndstate");
  if (nd > 35) {
    ndstate.innerHTML = "Nóng";
    ndstate.style.color = "red";
  } else if (nd >= 20 && nd <= 35) {
    ndstate.innerHTML = "Bình thường";
    ndstate.style.color = "green";
  } else {
    ndstate.innerHTML = "Lạnh";
    ndstate.style.color = "blue";
  }
});


firebase.database().ref("/TT_IoT/doam").on("value",function(snapshot){
  var da = snapshot.val();
  document.getElementById("doam").innerHTML = da;
  
  var dastate = document.getElementById("dastate");
  if (da > 70) {
  dastate.innerHTML = "Cao";
  dastate.style.color = "red";
  } else if (da >= 40 && da <= 70) {
  dastate.innerHTML = "Trung bình";
  dastate.style.color = "green";
  } else {
  dastate.innerHTML = "Thấp";
  dastate.style.color = "blue";
  }
  });


  firebase.database().ref("/TT_IoT/gas").on("value",function(snapshot){
    var kg = snapshot.val();
    document.getElementById("gas").innerHTML = kg;
    
    var kgstate = document.getElementById("gasstate");
    if (kg > 1000) {
    kgstate.innerHTML = "Cao";
    kgstate.style.color = "red";
    } else if (kg >= 500 && kg <= 1000) {
    kgstate.innerHTML = "Trung bình";
    kgstate.style.color = "green";
    } else {
    kgstate.innerHTML = "Thấp";
    kgstate.style.color = "blue";
    }
    });
    firebase.database().ref("/TT_IoT/anhsang").on("value", function(snapshot){
      var ds = snapshot.val();
      document.getElementById("anhsang").innerHTML = ds;
      
      var dsstate = document.getElementById("asstate");
      if (ds > 750) {
      dsstate.innerHTML = "Sáng";
      dsstate.style.color = "green";
      } else if (ds >= 500 && ds <= 750) {
      dsstate.innerHTML = "Trung bình";
      dsstate.style.color = "blue";
      } else {
      dsstate.innerHTML = "Tối";
      dsstate.style.color = "red";
      }
      });



// function to update image and switch status based on Firebase data

// function to update image and switch status based on Firebase data
function updateImageAndSwitchStatus(status, switchElement, imageElement) {
  if (status == "ON") {
    imageElement.src = imageElement.src.replace("_off", "_on");
    switchElement.checked = true;
  } else {
    imageElement.src = imageElement.src.replace("_on", "_off");
    switchElement.checked = false;
  }
}

// loop through all devices
const devices = document.querySelectorAll(".device");
devices.forEach((device) => {
  const switchElement = device.querySelector(".switch input");
  const imageElement = device.querySelector("img");
  const imageSrc = imageElement.getAttribute("src");
  const deviceNameElement = device.querySelector(".data-device-name");
  const deviceName = deviceNameElement.textContent.trim();
  
  // set up click event for device
  device.addEventListener("click", () => {
    switchElement.checked = !switchElement.checked;
    if (switchElement.checked) {
      imageElement.src = imageSrc.replace("_off", "_on");
      firebase.database().ref("/TT_IoT").update({
        [deviceName]: "ON"
      });
    } else {
      imageElement.src = imageSrc.replace("_on", "_off");
      firebase.database().ref("/TT_IoT").update({
        [deviceName]: "OFF"
      });
    }
  });

  // get data from Firebase and update image and switch status
  firebase.database().ref("/TT_IoT/" + deviceName).on("value", (snapshot) => {
    if (snapshot.exists()) {
      const status = snapshot.val();
      updateImageAndSwitchStatus(status, switchElement, imageElement);
    } else {
      console.log("No data available for " + deviceName + "!");
    }
  });

  // update image and switch status when the page is reloaded
  firebase.database().ref("/TT_IoT/" + deviceName).get().then((snapshot) => {
    if (snapshot.exists()) {
      const status = snapshot.val();
      updateImageAndSwitchStatus(status, switchElement, imageElement);
    } else {
      console.log("No data available for " + deviceName + "!");
    }
  });
});



var menuBtn = document.querySelector('.logo');
var menu = document.querySelector('.menu');

menuBtn.addEventListener('click', function() {
  menu.classList.toggle('show');
});

document.addEventListener('click', function(event) {
  if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
    menu.classList.remove('show');
  }
});





