document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5421

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  fetchImage();
})

function fetchImage(){
  let imageId = 5421
  fetch(`https://randopic.herokuapp.com/images/5421`)
  .then(resObj => resObj.json())
  .then(data => append(data))
};

function append(data){
  // console.log(data.comments)
  const imgContainer = document.getElementById('image');
  const name = document.getElementById('name')
  const likes = document.getElementById('likes')
  const ul = document.getElementById('comments')
  const commentArray = Object.keys(data['comments'])
  // console.log(commentArray)

  // imgContainer.src = ` <img src="${data.url} id="image" data-id=""/>` \\image is still not rendering properly. Url is pulling in- come back
  name.innerText = `${data.name}`
  likes.innerText = `${data.like_count}`
  // commentArray.forEach(comment =>{
  //   console.log(comment)
    // let li = document.createElement("li")
    // li.textContent = comment
  // })

  

};
