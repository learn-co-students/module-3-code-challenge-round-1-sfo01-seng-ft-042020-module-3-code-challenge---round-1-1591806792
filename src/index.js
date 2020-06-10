document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 5423 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})
    
    const imgDiv = document.getElementById('image')
   
    fetch(imageURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
    //   console.log(json)
    });
     
    // return Image.getTheImage(imageURL)
    //   .then(image => {
    //     // nameDiv.innerText = image.name
    //     imgDiv.src = image.url
    //   })


// renderImage(imageURL);



// fetch(request, options).then((response) => {
//   response.arrayBuffer().then((buffer) => {
//     var base64Flag = 'data:image/jpeg;base64,';
//     var imageStr = arrayBufferToBase64(buffer);

//     document.querySelector('img').src = base64Flag + imageStr;
//   });
// });