//1 GET data from URL
//2. on page load render an image, it's comments, and number of it's likes
//3. click a button to like image, when clicked number of likes on image increases (optemistic)
//4.form to add comment on image, on submit new comment on the bottom
//5.be sure backend is up to date on page refresh

let imageId = 5422

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`


renderImage()

//1 GET data from URL
function fetchImage() {
  return fetch(imageURL)
  .then(resp => resp.json())
}
//2. on page load render an image, it's comments, and number of it's likes
function renderImage() {
  fetchImage()
  .then((imageData) => {
    const title = document.querySelector('#name')
    const likes = document.querySelector('#likes')
    const image = document.querySelector('#image')
    const commentsform = document.querySelector('#comment_form')
    title.innerText = imageData.name
    image.setAttribute("src", imageData.url)
    likes.innerText = imageData.like_count
    displayComments(imageData)
    addLike(imageData)
    commentsform.addEventListener('submit', (event) => {
      event.preventDefault()
      const commentsUl = document.querySelector('#comments')
      const commentInput = event.target.comment
      const newLiEl = document.createElement('li')
      const comment = commentInput.value
      newLiEl.innerText = comment
      commentsUl.append(newLiEl)
      //data is being submitted to API but not reflected on page on refresh
      //given more time maybe write out something similar to displayComments()?
      //maybe find a way to call displayComments() to keep code DRY
      fetch(commentsURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId,
          content: comment
        })
      })
    })
  }) 
}


function displayComments(imageData) {
  const commentsUl = document.querySelector('#comments')
  const liEl = document.createElement('li')
  imageData.comments.map( comment => liEl.innerText = `${comment.content}`)
  commentsUl.append(liEl)
}
//3. click a button to like image, when clicked number of likes on image increases (optemistic)
function addLike(imageData) {
  const likeButton = document.querySelector('#like_button')
  likeButton.addEventListener('click', () => {
    let addLike = imageData.like_count += 1
    likes.innerText = addLike
    handleLikes()
  })
}

function handleLikes() {
  fetch(likeURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId
    })
  })
}

//4.form to add comment on image, on submit new comment on the bottom
// function handleSubmit() {
//   fetch(commentsURL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify({
//       image_id: imageId,
//       content: 
//     })
//   })
// }


//api data
// {
//   comments:[ 
//     {id: 100674, 
//     content: "first comment!",
//     image_id: 5422, 
//     created_at: "2020-06-10T16:46:44.553Z", 
//     updated_at: "2020-06-10T16:46:44.553Z"}
//   ]
//   id: 5422
//   like_count: 0
//   name: "Turing Tables"
//   url: "http://blog.flatironschool.com/wp-content/uploads/2015/10/laptop-352x200.jpg"
// }
