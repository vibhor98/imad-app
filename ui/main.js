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

var button = document.getElementById('counter');
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
};

//Submit name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit-btn');
submit.onclick = function() {
    
    //create a request obj
  var request = new XMLHttpRequest();
  
  //capture the response and store it in var
  request.onreadystatechange = function() {
      if(request.readyState === XMLHttpRequest.DONE) {
          //take some action
          if(request.status === 200) {
              var names = request.responseText;
              names = JSON.parse(names);
              var list = '';
              for(var i=0; i<names.length; i++) {
                    list += '<li>' + names[i] + '</li>';
              }
              var ul = document.getElementById('namelist');
              ul.innerHTML = list;
          }
      }
  };
  //make a request to the server and send the name
  request.open('GET', 'http://agarwalvibhor84.imad.hasura-app.io/submit-name?name=' + name, true);
  request.send(null);
  //capture a list of names and render it as a list
};












