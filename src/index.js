let imageURL;
let likeURL;
let commentsURL;

document.addEventListener('DOMContentLoaded', () => {
  // console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5420;

  imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

  likeURL = `https://randopic.herokuapp.com/likes/`;

  commentsURL = `https://randopic.herokuapp.com/comments/`;

  fetchImage();
  listenToFormSubmit();
})

function fetchImage() {
  fetch(imageURL)
  .then((response) => response.json())
  .then((imgData) => addImageToImageCard(imgData));
}

function addImageToImageCard(imgData) {
  // image
  const imgTag = document.getElementById("image");
  imgTag.setAttribute("src", imgData.url);

  // title
  const imgTitle = document.getElementById("name");
  imgTitle.innerText = imgData.name;

  // likes
  const likeCount = document.getElementById("likes");
  likeCount.innerText = imgData.like_count;

  // like click
  const imgCard = document.getElementById("image_card");
  imgCard.addEventListener("click", function(event) {
    if (event.target.id === "like_button") {
      // first, update front-end
      const likeCountInt = parseInt(likeCount.innerText);
      likeCount.innerText = likeCountInt + 1;

      // update back-end
      const configObj = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: 5420
        })
      }
      fetch(likeURL, configObj)
    }
  });
}

function listenToFormSubmit() {
  const commentForm = document.getElementById("comment_form");
  commentForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const commentInput = event.target.comment;
    const commentValue = commentInput.value;

    const commentsContainer = document.getElementById("comments");
    const commentList = document.createElement("li")
    commentList.innerText = commentValue;
    commentsContainer.append(commentList);

    // delete button
    // const deleteButton = document.createElement("button")

    // fetch update back-end
    const configObj = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: 5420,
        content: `${commentValue}`
      })
    }
    fetch(commentsURL, configObj)

    // front-end clear comment field
    commentInput.value = "";  
  });
}
