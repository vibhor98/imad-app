/*console.log('Loaded!');

//change the text of main-text div
var element = document.getElementById('main-text');
element.innerHTML = 'New Value';

//move the image
var img = document.getElementById('madi');
img.onclick = function() {
  img.style.marginLeft = '100px';  
};

var marginLeft = 0;
function moveRight() {
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
}
//move the image
var img = document.getElementById('madi');
img.onclick = function() {
  var interval = setInterval(moveRight, 50);
};*/

//Counter code

/*var button = document.getElementById('counter');
button.onclick = function() {
  
  //create a request obj
  var request = new XMLHttpRequest();
  
  //capture the response and store it in var
  request.onreadystatechange = function() {
      if(request.readyState === XMLHttpRequest.DONE) {
          //take some action
          if(request.status === 200) {
              var counter = request.responseText;
              var span = document.getElementById('count');
              span.innerHTML = counter.toString();
          }
      }
      //else do nothing
  }; 
  //make a request to the counter endpoint
  request.open('GET', 'http://agarwalvibhor84.imad.hasura-app.io/counter', true);
  request.send(null);
};*/

//Submit username/password to login
var submit = document.getElementById('submit-btn');
submit.onclick = function() {
    
    //create a request obj
  var request = new XMLHttpRequest();
  
  //capture the response and store it in var
  request.onreadystatechange = function() {
      if(request.readyState === XMLHttpRequest.DONE) {
          //take some action
          if(request.status === 200) {
              console.log('user logged in!');
              alert('Logged in successfully!!!');
              submit.value = 'Logged in';
          } else if(request.status === 403) {
              alert('Invalid username/password');
          }  else if(request.status === 5000) {
              alert('Something went wrong on the server');
          }
      }
  };
  //make a request to the server and send the name
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  console.log(username);
  console.log(password);
  request.open('POST', 'http://agarwalvibhor84.imad.hasura-app.io/login', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username: username, password: password}));
  submit.value = 'Logging...'
  //capture a list of names and render it as a list
};

//Submit username/password to register
var register = document.getElementById('register');
register.onclick = function() {
    
    //create a request obj
  var request = new XMLHttpRequest();
  
  //capture the response and store it in var
  request.onreadystatechange = function() {
      if(request.readyState === XMLHttpRequest.DONE) {
          //take some action
          if(request.status === 200) {
              console.log('user registered successfully!');
              alert('Registered successfully!!!');
              register.value = 'Registered';
          } else {
              alert('Could not register!');
              register.value = 'Register';
          }  
      }
  };
  //make a request to the server and send the name
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  console.log(username);
  console.log(password);
  request.open('POST', '/create-user', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username: username, password: password}));
  register.value = 'Registering...';
  //capture a list of names and render it as a list
};











