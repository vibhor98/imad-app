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
var counter = 0;
var button = document.getElementById('counter');
button.onclick = function() {
  //make a request to the counter endpoint
  
  //capture the response and store it in var
  
  //render the var in the correct span 
  counter = counter + 1;
  var span = document.getElementById('counter');
  span.innerHTML = counter.toString();
};