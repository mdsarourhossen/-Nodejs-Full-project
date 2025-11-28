const checkLoggedInUser = () => {
    let user = localStorage.getItem('loggedInUser');
    if (user) {
        user = JSON.parse(user);
    } else {
        window.location.href = '/index.html';
    }
};

// Show user name
const showLoggedUsername = () => {
    const userNameElement = document.getElementById('logged-username');
    let user = localStorage.getItem('loggedInUser');
    if (user) {
        user = JSON.parse(user);
        userNameElement.innerText = user.userName;
    }
};

      // logout fanction
   const logOut = () => {
    localStorage.clear();
    checkLoggedInUser();
};


const fetchAllPost = async () => {
    try {
        const res = await fetch('http://localhost:5000/getAllPosts');
        const data = await res.json();
        showAllPosts(data);
    } catch (err) {
        console.log("Error fetching data from server", err);
    }
};

// All post disply
const showAllPosts = (allPost) => {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = "";

    allPost.forEach(async (post) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        // singal pos to reples
        const safePostText = post.postText.replace(/'/g, "&apos;").replace(/"/g, "&quot;");

      
        postDiv.innerHTML = `
            <div class="post-header"> 
                <div class="post-user-iamge">
                    <img src="${post.postedUserImage}" alt="user" />
                </div>

                <div class="post-username-time">
                    <p class="post-user-name">${post.postedUserName}</p>
                    <div class="posted-time">
                       <span>${typeof timeDiffernce !== 'undefined' ? timeDiffernce(post.postedTime) : 'Just now'}</span>
                        <span>ago</span>
                    </div>
                </div>
                <div class="post-actions" style="margin-left: auto; display: flex; gap: 10px;">
                     <button style="cursor:pointer; background:green; color:white; border:none; padding:5px; border-radius:4px;" 
                             onclick="editPost(${post.postId}, '${safePostText}')">Edit</button>
                     
                     <button style="cursor:pointer; background:red; color:white; border:none; padding:5px; border-radius:4px;" 
                             onclick="deletePost(${post.postId})">Delete</button>
                </div>
            </div>

            <div class="post-text">
                <p class="post-text-content">${post.postText}</p>
            </div>
            
            <div class="post-image">
                <img src="${post.postImageUrl}" alt="post-image" />
            </div>
        `;

        postContainer.appendChild(postDiv);

        // coment loding
        let postComments = await fetchAllcomentsOfAPost(post.postId);
        
        postComments.forEach((comment) => {
            const commentsholderDiv = document.createElement('div');
            commentsholderDiv.classList.add('comments-holder');
            commentsholderDiv.innerHTML = `
            <div class="comment">
                <div class="comment-user-image">
                    <img src="${comment.commentedUserImage}" />
                </div>
                <div class="comment-text-container">
                    <h4>${comment.commentedUserName}</h4>
                    <p class="comment-text">${comment.commentText}</p>
                </div>
            </div>`;
            postDiv.appendChild(commentsholderDiv);
        });

        // new coment accpt input box
        const addNewCommentDiv = document.createElement('div');
        addNewCommentDiv.classList.add('postComment-holder');
        addNewCommentDiv.innerHTML = `
        <div class="postComment-holder">
            <div class="post-comment-input-field-holder">
                <input type="text" placeholder="post your comment" class="postComment-input-field" id="postComment-input-for-postId-${post.postId}"/>
            </div>
            <div class="comment-btn-holder"> 
                <button onClick="handlePostComment(${post.postId})" class="postCommen-btn">comment</button>
            </div>
        </div>`;
        postDiv.appendChild(addNewCommentDiv);
    });
};

// coment submit
const handlePostComment = async (postId) => {
    let user = localStorage.getItem('loggedInUser');
    if (user) {
        user = JSON.parse(user);
    }
    const commentedUserId = user.userId;
    const commentTextElement = document.getElementById(`postComment-input-for-postId-${postId}`);
    const commentText = commentTextElement.value;

    let now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    let timeOfComment = now.toISOString();

    const commentObject = {
        commenteOfPostId: postId,
        commentedUserId: commentedUserId,
        commentText: commentText,
        commentTime: timeOfComment,
    };

    try {
        await fetch('http://localhost:5000/postComment', {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(commentObject),
        });
        location.reload();
    } catch (err) {
        console.log("Error sending comment", err);
    }
};

// coment fatch
const fetchAllcomentsOfAPost = async (postId) => {
    let commentsOfPost = [];
    try {
        const res = await fetch(`http://localhost:5000/getAllcomments/${postId}`);
        commentsOfPost = await res.json();
    } catch (err) {
        console.log("Error fetching comments from the  server");
    }
    finally{

  return commentsOfPost;
}
};
// add new post
    const handleAddNewPost = async () => {
    let user = localStorage.getItem('loggedInUser');
    if (user) {
        user = JSON.parse(user);
    }
    const postedUserId = user.userId;

    let now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    let timeOfPost = now.toISOString();

    const postTextElement = document.getElementById('new-post-text');
    const postText = postTextElement.value;

    const postImageElement = document.getElementById('new-post-image');
    const postImageUrl = postImageElement.value;

    const postObject = {
        postedUserId: postedUserId,
        postedTime: timeOfPost,
        postText: postText,
        postImageUrl: postImageUrl,
    };

    try {
        await fetch('http://localhost:5000/addNewPost', {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(postObject),
        });
        location.reload();
    } catch (err) {
        console.log("Error adding post", err);
    }
}; 
// post delete function
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

// edit post
const editPost = async (postId, oldText) => {
   
    let cleanText = oldText;
    if(cleanText) {
        cleanText = cleanText.replace(/&apos;/g, "'").replace(/&quot;/g, '"');
    }

    const newText = prompt("Update your post text:", cleanText);

    // user cencel or  no change text
    if (newText === null || newText === cleanText) return;

    const updateObject = {
        postId: postId,
        newText: newText
    };

    try {
        const res = await fetch('http://localhost:5000/updatePost', {
            method: 'PUT',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(updateObject),
        });

        if (res.ok) {
            alert("Post updated successfully");
            location.reload();
        } else {
            alert("Failed to update post");
        }
    } catch (err) {
        console.log("Error updating post:",err);}
};


  fetchAllPost();
