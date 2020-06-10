  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 5418 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
  loadImageAndDisplay();
  addClickHandlers();

  function loadImageAndDisplay() {
    fetch(imageURL)
      .then(resp=>resp.json())
      .then(json=>{
        const image = document.getElementById('image');
        const title = document.getElementById('name');
        const likes = document.getElementById('likes');

        image.src = json.url;
        title.innerText = json.name;
        likes.innerText = json.like_count

        console.log(json);
        const comments = json.comments;
        const commentList = document.getElementById('comments')

        for (comment of comments) {
          const listItem = document.createElement('li');
          const button = document.createElement('button');
          const textContent = document.createTextNode(comment.content);
          
          button.innerText = "Delete";
          button.dataset.commentId = comment.id;
          
          listItem.appendChild(button);
          listItem.appendChild(textContent);
          commentList.appendChild(listItem);
        }
      })
  }

  function addClickHandlers() {
    document.getElementById('like_button').addEventListener('click', addLike);
    document.getElementById('comment_form').addEventListener('submit', (e)=>addNewComment(e));
    document.getElementById('comments').addEventListener('click', (e)=>commentClicked(e))
  }

  function addLike() {
    const likes = document.getElementById('likes');
    likes.innerText++;
    shipToServer('like')
  }

  function addNewComment(event) {
    const commentList = document.getElementById('comments');
    const theBox = document.getElementById('comment_input');
    if (theBox.value) {
      const newComment = document.createElement('li');
      const button = document.createElement('button');
      const textContent = document.createTextNode(theBox.value);
      
      button.innerText = "Delete";
      button.disabled = true;  //Helps prevent deletion before/if comment is persisted to backend   enabled in fetch chain
      newComment.appendChild(button);
      newComment.appendChild(textContent);
      commentList.appendChild(newComment);

      shipToServer('comment', theBox.value, newComment);
      theBox.value = "";
    }
    event.preventDefault();
  }

  function commentClicked(event) {
    const recip = event.target
    if (recip.tagName === "BUTTON") {
      shipToServer('delete-comment', recip.dataset.commentId, recip)
    }
  }

  //single function to handle POST to either route; 2nd arg content only used for /comments POST & DELETE
  function shipToServer(type, content, element) {
    let dest, body, method;
    switch (type) {
      case 'like':
        dest = likeURL;
        method = "POST";
        body = JSON.stringify({image_id: imageId})
        break;
      case 'comment':
        dest = commentsURL;
        method = "POST";
        body = JSON.stringify({image_id: imageId, content: content})
        break;
      case 'delete-comment':
        dest = commentsURL + content;
        method = "DELETE";
    }

    const config = {
                method: method,
                headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json"
                },
                body: body
    }
    fetch(dest, config)
      .then(resp=>resp.json())
      .then(json=>{
        if (type === 'comment') {
          const lastButton = element.querySelector('button');
          lastButton.dataset.commentId = json.id;
          lastButton.disabled = false;
        } else if (type === 'delete-comment') {  //caught at last minute that it says pessimistic rendering for DELETE.  I see you, sneaky instructors
            element.closest('ul').removeChild(element.parentNode); //mmmm, tasty  UL.removeChild(LI) essentially, from BUTTON POV
        }
      })
  }