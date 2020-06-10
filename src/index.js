document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5419

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})

fetch('https://randopic.herokuapp.com/images/5419')
.then(resObj => resObj.json())
.then(data => { console.log(data)
  const img = document.getElementById('image');
  const h4 = document.getElementById('name')
  const likes = document.getElementById('likes')
  const comments = document.getElementById('comments')
  
 
  const newComment = (data.comments[0].content)
  
 
  img.src = data.url;
  h4.innerHTML = data.name;
  likes.innerHTML = data.like_count
  comments.innerHTML += `<p>${newComment}</p>`

  const likeButton = (document.getElementById('like_button'))

  likeButton.addEventListener('click', (e) => {
  if(e.target.tagName === 'BUTTON'){
    
    let num = parseInt(likes.innerText)
    num += 1
    likes.innerText = num

    fetch("https://randopic.herokuapp.com/likes", {
      method: "PATCH",
      header: {
      "Accept": 'application/json',
      "Content-Type": 'application/json'
      },
      body: JSON.stringify ({
        "image_id": 5419,
        "like_count": num
      })
    })
  }
  })
})


