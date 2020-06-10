let imageId = 5416 //Enter the id from the fetched image here

const rootURL = "https://randopic.herokuapp.com"


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  init();
  
})

const init = () => {
  fetchImage().then(img => renderImage(img));
  listenForLikes();
  addComment();

}


function fetchImage() {
  return fetch(`${rootURL}/images/${imageId}`)
  .then(res => res.json())
}

const renderImage = (img) => {
  const image = document.querySelector("#image");
  image.src = img.url;
  image.dataset.id = img.id;
  const title = document.querySelector("#name");
  title.innerText = img.name;
  const likes = document.querySelector("#likes");
  likes.innerText = img.like_count;
  const likeButton = document.querySelector("#like_button");
  likeButton.dataset.id = img.id;
  img.comments.forEach(comment => {
    displayComment(comment);
  })
}

const displayComment = (comment) => {
  const commentList = document.querySelector("#comments");
  const commentItem = document.createElement('li');
  commentItem.innerText = comment.content;
  const deleteBtn = document.createElement('i');
  deleteBtn.className = "fa fa-trash delete-icon";
  deleteBtn.dataset.commentId = comment.id
  deleteBtn.addEventListener('click', (e) => {
    deleteComment(e).then(removeComment(e))
  });
  commentItem.append(deleteBtn);
  commentList.append(commentItem);
}

function listenForLikes() {
  const btn = document.querySelector("#like_button");
  btn.addEventListener('click', e => {
    likeImage(e)
    .then( updateLikeCount())
  });
}


function likeImage(e) {
  const imageId = e.target.dataset.id
  return fetch(`${rootURL}/likes`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      image_id: imageId
    })
  }).then(res => res.json())
}

const updateLikeCount = () => {
  const likes = document.querySelector("#likes");
  likes.innerText = parseInt(likes.innerText, 10) + 1
  
}

const addComment = () => {
  const form = document.querySelector("#comment_form");
  form.addEventListener('submit', (e) => {
    submitComment(e);
    form.reset();
  })
}

function submitComment(e) {
  e.preventDefault();
  const comment = {
    content: e.target.comment.value,
    image_id: imageId
  }
  fetch(`${rootURL}/comments`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())
  .then(obj => displayComment(obj))
  .catch(err => {
    console.log(err);
    return alert(err);
  })
}

function deleteComment(e) {
  const commentId = e.target.dataset.commentId;
  return fetch(`${rootURL}/comments/${commentId}`, {
    method: "DELETE"
  }).then(res => res.json())
  .catch(err => {
    console.log(err);
    alert(err);
  })
}

function removeComment(event) {
  event.target.parentNode.remove()
}