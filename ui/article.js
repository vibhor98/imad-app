var currentArticleTitle = window.location.pathname.split('/')[2];

function loadCommentForm() {
    var commentFormHtml = `
    <h4>Submit a comment- </h4>
    <textarea cols="100" rows="4" id="text_comment" placeholder="Enter your comments here..."></textarea>
    <br/>
    <input type="submit" id="submit" value="Submit">
    <br/>`;
    document.getElementById('comment_form').innerHTML = commentFormHtml;
    
    
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
        };
        var comment = document.getElementById('text_comment').value;
        request.open('POST', '/submit-comment/' + currentArticleTitle , true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({comment: comment}));
        submit.value = 'Submitting...';
    };
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

function escapeHTML() {
    var $text = document.createTextNode(text);
    var $div = document.createElement('div');
    $div.appendChild($text);
    return $div.innerHTML;
}
function loadcomments() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.readystate === XMLHttpRequest.DONE) {
            var comments = document.getElementById('comments');
            var content = '';
            var commentsData = JSON.parse(this.responseText);
            if(request.status === 200) {
                for(var i=0; i<commentsData.length; i++) {
                    var time = new Date(commentsData[i].timestamp);
                    content += ` <div class="comment">
                    <p>${escapeHTML(commentsData[i].comment)}</p>
                    <div class="commentor">
                        ${commentsData[i].username} - ${time.toLocaleTimeString()} on ${time.toLocaleDateString()}
                    </div> 
                </div>`;
                }
                comments.innerHTML = content;
            }  else {
                comments.innerHTML("Opps! Could not load comments");
            }
        }
    };
    request.open('GET', '/get-comments/' + currentArticleTitle, true);
    request.send(null);
}

loadlogin();
loadcomments();