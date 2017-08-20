var currentArticleTitle = window.location.pathname.split('/')[2];

function loadCommentForm() {
    var commentFormHtml = `
    <h4>Submit a comment </h4>
    <textarea cols="100" rows="4" id="text_comment" placeholder="Enter your comments here..."></textarea>
    <br/>
    <input type="submit" id="submit" value="Submit">
    <br/>`;
    
    var submit = document.getElementById('submit');
    submit.onclick = function() {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if(request.readystate === XMLHttpRequest.DONE) {
                if(request.status === 200) {
                    document.getElementById('text_comment').value = '';
                    loadcomments();
                }  else {
                    alert("Error! Couldn't submit the form");
                }
            }
        }
    };
    var comment = document.getElementById('text_comment').value;
    request.open('POST', '/submit-comment/' + currentArticleTitle , true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({comment: comment}));
    submit.value = 'Submitting...';
}

function loadlogin() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.readystate === XMLHttpRequest.DONE) {
            if(request.status === 200)
                loadCommentForm(this.responseText);
        }
    };
    request.open('GET', '/check-login', true);
    request.send(null);
}

function loadcomments() {
    
}