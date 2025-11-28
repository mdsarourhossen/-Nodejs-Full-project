const showLoggedUsername =()=>{
const userNameElement = document.getElementById('logged-username');
//find username from localstorage
let user = localStorage.getItem('loggedInUser');
if(user){
user = JSON.parse(user);
}
// show username in the webpage 

userNameElement.innerText = user.userName;
};

const checkLoggedInUser = () =>{
let user = localStorage.getItem('loggedInUser');
if(user){
user = JSON.parse(user);
}
else{
window.location.href ='/index.html';

}
};


const logOut = () =>{

//clearing the localstorage 
localStorage.clear();
 checkLoggedInUser ();
};


const fetchAllPost = async() =>{
let data;
try{
const res = await fetch('http://localhost:5000/getAllPosts');
data = await res.json();
//console.log(data);
showAllPosts(data);

}catch(err){
 console.log ("Error fetching data from server"); 
}

};
const showAllPosts = (allPost) =>{
const postContainer = document.getElementById('post-container');
postContainer.innerHTML = "";

allPost.forEach(async(post )=>{
  console.log ("My post object:",post);
const postDiv = document.createElement('div');
postDiv.classList.add('post');
postDiv.innerHTML = `
<div class="post-header"> 
<div class="post-user-iamge">
<img src=${post.postedUserImage}
/>
</div>

<div class="post-username-time">
<p class="post-user-name">${post.postedUserName}</p>
<div class="posted-time">
<span>${timeDiffernce(`${post.postedTime}`)}</span>
<span>ago</span>
</div>
</div>

<div class="post-actions">
    <button onclick="editPost(${post.postId}, '${post.postText.replace(/'/g, "\\'")}')" class="btn-edit">Edit</button>
    <button onclick="deletePost(${post.postId})" class="btn-delete">Delete</button>
</div>

</div>

<div class="post-text">
<p class="post-text-content">${post.postText}</p>

</div>
<div class="post-image">
<img src=${post.postImageUrl}
</div>

`;

// ... আগের কোড
<div class="post-header"> 
    <div class="post-user-iamge">
        <img src=${post.postedUserImage} />
    </div>

    <div class="post-username-time">
        <p class="post-user-name">${post.postedUserName}</p>
        <div class="posted-time">
            <span>${timeDiffernce(${post.postedTime})}</span>
            <span>ago</span>
        </div>
    </div>
    
    <!-- newtext -->
    <div class="post-actions">
         <button style="margin-right:5px; cursor:pointer;" onclick="editPost(${post.postId}, '${post.postText.replace(/'/g, "\\'")}')">Edit</button>
         <button style="cursor:pointer;" onclick="deletePost(${post.postId})">Delete</button>
    </div>
    <!-- শেষ -->

</div>


postContainer.appendChild(postDiv);

//comments under a post
let postComments =await fetchAllcomentsOfAPost (post.postId);
console.log('postComments:',postComments);

postComments.forEach((comment) =>{

    const commentsholderDiv = document.createElement('div');
commentsholderDiv.classList.add('comments-holder');
commentsholderDiv.innerHTML =`<div class="comment">
   <div class="comment-user-image">
  <img src=${comment.commentedUserImage}
  />
</div>
<div class="comment-text-container">
<h4>${comment.commentedUserName}</h4>
<p class="comment-text">${comment.commentText}</p>
</div>
</div> `
;
postDiv.appendChild(commentsholderDiv);
});
//adding a new comment to the post
const addNewCommentDiv = document.createElement('div');
addNewCommentDiv.classList.add('postComment-holder');
addNewCommentDiv.innerHTML = `
<div class="postComment-holder">
 <div class="post-comment-input-field-holder">
<input type="text" placeholder="post your comment " class="postComment-input-field" id="postComment-input-for-postId-${post.postId}"
/>
</div>
<div class="comment-btn-holder"> 
<button onClick=handlePostComment(${post.postId}) id="comment-btn" class="postCommen-btn">comment</button>
</div>
</div>
`;
postDiv.appendChild(addNewCommentDiv);

});

};

const handlePostComment = async(postId) =>{
//collecting logged in udser Id from localstorage
 let user = localStorage.getItem('loggedInUser');
if(user){
user=JSON.parse(user);

}
const commentedUserId = user.userId;
// getting comment text from input
const commentTextElement = document.getElementById(`postComment-input-for-postId-${postId}`);

const commentText =  commentTextElement.value;
//current time of the comment

let now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
let timeOfComment = now.toISOString();

const commentObject = {
commenteOfPostId : postId,
commentedUserId : commentedUserId,
commentText: commentText,
commentTime:timeOfComment,

};
try{
  const res = await fetch('http://localhost:5000/postComment',{
method:'POST',
headers:{"content-type":"application/json",

},
body:JSON.stringify(commentObject),

  });
const data = await res.json();

}
catch(err){

console.log("Error while sending data to the server",err);
}
finally{
  location.reload();
}
};

const fetchAllcomentsOfAPost = async(postId) =>{

let commentsOfPost =[];
try{
const res = await fetch(`http://localhost:5000/getAllcomments/${postId}`);
commentsOfPost = await res.json ();
}
catch(err){

console.log ("Error fetching comments from the  server"); 
}
finally{

  return commentsOfPost;
}
};
const handleAddNewPost =  async()=>{

//grtting user id from localstorage 
 let user = localStorage.getItem('loggedInUser');
if(user){
user=JSON.parse(user);

}
const postedUserId = user.userId;

//current time of the post

let now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
let timeOfPost = now.toISOString();

//post text
const postTextElement = document.getElementById('new-post-text');
const postText = postTextElement.value;

//post image
const postImageElement = document.getElementById('new-post-image');
const postImageUrl = postImageElement.value;

//creating a post object  
const  postObject = {
  postedUserId: postedUserId,
  postedTime: timeOfPost,
  postText:postText,
  postImageUrl:postImageUrl,
};
try{
  const res = await fetch('http://localhost:5000/addNewPost',{
method:'POST',
headers:{"content-type":"application/json",

},
body:JSON.stringify(postObject),

  });
const data = await res.json();

}
catch(err){

console.log("Error while sending data to the server",err);
}
finally{
  location.reload();
}

};

// ১. পোস্ট ডিলিট করার ফাংশন
const deletePost = async (postId) => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
        const res = await fetch(`http://localhost:5000/deletePost/${postId}`, {
            method: 'DELETE',
        });
        if (res.ok) {
            alert("Post deleted successfully");
            location.reload();
        } else {
            alert("Failed to delete post");
        }
    } catch (err) {
        console.log("Error deleting post:", err);
    }
};
// this function autometically runs
// ২. পোস্ট এডিট করার ফাংশন
const editPost = async (postId, oldText) => {
    const newText = prompt("Update your post text:", oldText);
    
    if (newText === null || newText === oldText) return; // যদি ক্যানসেল করে বা কিছু চেঞ্জ না করে

    const updateObject = {
        postId: postId,
        newText: newText
    };

    try {
        const res = await fetch('http://localhost:5000/updatePost', {
            method: 'PUT', // অথবা 'PATCH' (আপনার ব্যাকএন্ড অনুযায়ী)
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updateObject),
        });

        if (res.ok) {
            alert("Post updated successfully");
            location.reload();
        } else {
            alert("Failed to update post");
        }
    } catch (err) {
        console.log("Error updating post:", err);
    }
};

fetchAllPost();
