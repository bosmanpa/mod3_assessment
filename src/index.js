function fetchImg(imgURL){
  fetch(imgURL)
  .then(response => response.json())
  .then(imageData => renderImage(imageData))
}

function renderImage(imageData){
  const imgTag = document.getElementById('image')
  imgTag.src = imageData.url

  const imgName = document.getElementById('name')
  imgName.innerText = imageData.name

  const imgLikes = document.getElementById('likes')
  imgLikes.innerText = imageData.like_count

  renderComments(imageData)
}

function renderComments(imageData){
imageData.comments.forEach(comment => renderComment(comment))
}

function renderComment(comment){
  const liEl = `<li id=${comment.id}>${comment.content}</li>`
  const ulEL = document.getElementById('comments')
  ulEL.insertAdjacentHTML('beforeend',liEl)



function likeListener(){
  const likeBtn = document.getElementById("like_button")
  likeBtn.addEventListener('click', event => {
    addLike(event)
  })
}


function addLike(event){
  const likes = parseInt(event.target.previousElementSibling.firstElementChild.innerText) + 1
  event.target.previousElementSibling.firstElementChild.innerText = likes
  postLike()
}

function postLike(){
fetch('https://randopic.herokuapp.com/likes',{
  method: "POST",
  headers:{
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body:JSON.stringify({
    image_id: 4064
  })
})
}

function commentListener(){
  const commentForm = document.getElementById("comment_form")
  commentForm.addEventListener('submit', event => {
    event.preventDefault()
    addComment(event)
    event.target.reset()
})
}

function addComment(event){
  const commentText = event.target.comment.value
  const ulEL = document.getElementById('comments')
  const liEl= `<li>${commentText}</li>`
  ulEL.insertAdjacentHTML('beforeend',liEl)
  postComment(commentText)
}

function postComment(commentText){
  fetch('https://randopic.herokuapp.com/comments',{
    method: "POST",
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      image_id: 4064,
      content: commentText
    })
  })
  .then(response => response.json())
  .then(comment => addCommentId(comment))
}
  // ADD DELETE BUTTON TO NEW COMMENT
function addCommentId(comment){
  const newComment = document.getElementById('comments').lastChild
  newComment.innerHTML = `<li id=${comment.id}>${comment.content}</li><button>Delete</button>`
  newComment.lastChild.addEventListener('click', event => {
    deleteComment(event)
  })
}
function deleteComment(event){
const commentId = event.target.previousElementSibling.id
const commentUl = event.target.parentElement.parentElement
commentUl.removeChild(commentUl.lastChild)
fetch(`https://randopic.herokuapp.com/comments/${commentId}`,{
  method: "DELETE",
  headers:{
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  })

}



function main(){
  document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4064 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImg(imageURL)
  likeListener()
  commentListener()
})
}

main()