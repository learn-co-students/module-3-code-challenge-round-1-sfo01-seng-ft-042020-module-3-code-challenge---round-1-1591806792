document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5417

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  loadPicture()
})

function loadPicture(){
  fetch(`https://randopic.herokuapp.com/images/5417`)
  .then(response => response.json())
  .then(picture => displayPicture(picture));

}

function displayPicture(picture){
  console.log(picture)
  let titleContainer = document.getElementById("name")
  titleContainer.innerText = `${picture.name}`

  let likesContainer = document.getElementById("number")
  likesContainer.innerText = `${picture.like_count}`

  let photoContainer = document.getElementById("image")
   photoContainer.src = picture.url

  let commentsContainer = document.getElementById("comments")
  commentsContainer.innerHTML = `<ul> ${picture.comments[0].content}</ul>`
}


// const likeButton = document.getElementById("like_button");
// likeButton.addEventListener("click", function(e){
//   let likeValue = parseInt(document.getElementById("likes").value);
//   debugger
//   // e.target.likeValue.innerText += 1; 

  
// })

function incrementValue()
{
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;

    
    const data = { image_id: 5417 };
    
    
    fetch(`https://randopic.herokuapp.com/likes/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => console.log(data));
}


let commentForm = document.getElementById("comment_form")
commentForm.addEventListener("submit", function(e){
  e.preventDefault();
  const commentInput = document.getElementById("comment_input")
  const actualComment = commentInput.value

  if (actualComment){
    let commentSection = document.getElementById("comments")
    
    commentSection.innerHTML += `<ul>${actualComment} </ul> `
  }

  

  const data = { image_id: 5417, content: `${actualComment}` };
    
    
    fetch(`https://randopic.herokuapp.com/comments`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => console.log(data));
  

})




