// Initialize Firebase
var config = {
  apiKey: "AIzaSyAi2uLzEvHu2_R6r_QQxr0DVXQkpz_LwqA",
  authDomain: "light-simulating-calculator.firebaseapp.com",
  databaseURL: "https://light-simulating-calculator.firebaseio.com",
  projectId: "light-simulating-calculator",
  storageBucket: "light-simulating-calculator.appspot.com",
  messagingSenderId: "982520848532"
};
firebase.initializeApp(config);
var database = firebase.database();

function userRegistration() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var contact = document.getElementById('contact').value;
  var password = document.getElementById('password').value;
  var checkpassword = document.getElementById('checkpassword').value;

  if(name == "" && email == "" && contact == "" && password == "" && checkpassword == "") {
    alert('Fields cannot be blank.');
    return;
  }
  if(password != checkpassword) {
      alert('Please check the passwords you have entered.');
      return;
  }
  if (email.length < 4) {
        alert('Please enter a valid email address.');
        return;
  }
  if (password.length < 4) {
        alert('Please enter a password more than 4 characters.');
        return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(firebaseUser) {
    alert('Registration Successful.');
  })
  .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
    });

    checkUserData();
}

function checkUserData() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var contact = document.getElementById('contact').value;
  var emailArray = [];
  var firebaseEmail;

  var rootref = firebase.database().ref('/Registered Users/').orderByChild("email");
  rootref.once('value', function(snapshot) {
    var val = snapshot.forEach(function (childSnapshot) {
      var value = childSnapshot.val();
      //console.log(value.email);
      firebaseEmail = value.email;
      emailArray.push(firebaseEmail);
      //console.log("User Email" + email);
      //console.log("Firebase Email" +firebaseEmail);
    })
    console.log("Email Array" +emailArray);
    if(!emailArray.includes(email)) {
      writeUserData(name, email, contact);
    }
  });
}

function writeUserData(name, email, contact) {
    database.ref('Registered Users/').push().set({
      username: name,
      email: email,
      phone : contact
    });
}

function userLogin() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  if(email == "" && password == "") {
    alert('Fields cannot be blank.');
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
      alert('Login Successful.');
      window.location = 'index.html';
  })
  .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
      console.log(error);
  });
}

function adminLogin() {
  var email = "sonaray@gmail.com";
  var password = "sonaray@123";

  var getEmail = document.getElementById('email').value;
  var getPassword = document.getElementById('password').value;

  if(getEmail == "" && getPassword == "") {
    alert('Fields cannot be blank.');
    return;
  }

  if(getEmail == email && getPassword == password) {
    firebase.auth().signInWithEmailAndPassword(getEmail, getPassword).then(function(firebaseUser) {
        alert('Login Successful.');
        window.location = 'adminDetail.html';
    })
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        console.log(error);
    });
  }
 }
