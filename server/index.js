const express = require('express');
const cors = require ('cors');
const mysql = require('mysql2');
const port = 5000;
const app = express();
//middlewares
app.use(cors());
app.use(express.json());
/*app.get('/example',(req,res) =>{
res.send({frist:'munna',age:30});
});*/
// making connection with my sql server
let db = mysql.createConnection({
  host     : 'mysql-8a7e6e2-smdsarourhossen-0d4d.g.aivencloud.com',
  user     : 'avnadmin',
  password : 'AVNS_u4ZQ1ZpWZ3Zv_2tpIm1',
  database : 'defaultdb',
      port: 23446,
       ssl: {
           rejectUnauthorized:false}
});
db.connect((err) =>{
if(err){
   console.log('Someting went wrong while connecting to the databese:',err);
   throw err;
}
else{
console.log('Mysql Server Connected....');

}
});
//greting user data from server

app.post('/getUserInfo',(req,res) =>{
const {userId,password} = req.body;

const getUserInfosql= `SELECT userId,userName,userImage FROM users WHERE users.userId=? AND users.userPassword=?`;

let query = db.query(getUserInfosql,[userId,password],(err,result) =>{
if(err){
console.log('Error getting user from server:',err);
throw err;
}
else{
res.send(result);


}
});
});

app.get('/getAllPosts',(req,res) =>{
const sqlForAllPosts =`SELECT posts.postId, users.userName As postedUserName, users.userImage As postedUserImage,posts.postedTime,posts.postText,posts.postImageUrl FROM posts INNER JOIN users ON posts.postedUserId=users.userId ORDER BY posts.postedTime DESC`;
let query = db.query(sqlForAllPosts,(err,result) =>{
if(err){
console.log("Error loading all posts from database:",err);

}
else{
  console.log(result);
res.send(result);

}
});
});
//getting comments of a single post
app.get('/getAllcomments/:postId',(req,res)=>{
let id = req.params.postId;
let sqlForAllComments =`SELECT users.userName As commentedUserName, users.userImage As commentedUserImage,comments.commentId,comments.commentOfPostId,comments.commentText,comments.commentTime FROM comments INNER JOIN users ON comments.commentedUserId=users.userId WHERE comments.commentOfPostId= '${id}'`;
let query = db.query(sqlForAllComments,(err,result) =>{
if(err){
console.log('Error fetching comments from the databese',err);
throw err;
}
else{
res.send(result);

}
});
});
//adding new comment to a post 
app.post('/postComment',(req,res) =>{
const {commenteOfPostId, commentedUserId, commentText, commentTime,} = req.body;

let sqlForAddingNewComments = `INSERT INTO comments (commentId,commentOfPostId, commentedUserId, commentText, commentTime) VALUES (NULL, ?, ?, ?, ?)`
let query = db.query(sqlForAddingNewComments,[commenteOfPostId, commentedUserId, commentText, commentTime,],(err,result) => {
if(err){
console.log("Eroor adding comment to the databese:", err);
}
else{

res.send(result);

}

});
});

app.post('/addNewPost',(req,res) =>{
//destracture the req.body object
const {postedUserId,postedTime,postText, postImageUrl} =req.body; 
  const formattedTime = new Date(postedTime).toISOString().slice(0, 19).replace('T', ' ');

// sqlquery
//sql injection attack(=?)
let sqlForAddingNewPost =`INSERT INTO posts (postId, postedUserId, postedTime, postText, postImageUrl) VALUES (NULL, ?, ?, ?,?)`;
let query = db.query(sqlForAddingNewPost,[postedUserId,formattedTime ,postText, postImageUrl],(err,result) =>{
if(err){
console.log("Error while adding a new post in the databese",err);
throw err;
}
else{
res.send(result);
}

});
});

// Post Delete API
app.delete('/deletePost/:id', (req, res) => {
    const postId = req.params.id;
    
    // sqlquary for post delete
    const sql = "DELETE FROM posts WHERE postId = ?";
    
    db.query(sql, [postId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error deleting post");
        } else {
            res.send("Post deleted successfully");
        }
    });
});

// Post Update API
app.put('/updatePost', (req, res) => {
    // New text accept for forntend 
    const { postId, newText } = req.body; 

    const sql = "UPDATE posts SET postText = ? WHERE postId = ?";
    
    db.query(sql, [newText, postId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error updating post");
        } else {
            res.send("Post updated successfully");
        }
    });
});




app.listen(port, () =>{
console.log(`Server is running on port ${port}`);
});
