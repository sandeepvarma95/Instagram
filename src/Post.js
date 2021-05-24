import React, {useState, useEffect} from 'react'
import './Post.css'
import Avatar from "@material-ui/core/Avatar"
import { storage, db } from './firebase.js'
import firebase from "firebase";

function Post({ postId, user, username, caption, imageUrl }) {                     // user is who signed in and username is person who wrote the post
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {                                                               //the post with particular id is read, as postId={id} and snapshot of comments is taken
        let unsubscribe;
        if(postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp','desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()))
                })
        }

        return () => {
            unsubscribe();
        }
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()                                                           
        })
        setComment('');
    }

    return (
        <div className="post"> 
            {/* Header -> avatar + username */}
         <div className="post_header">
            <Avatar
                className="post_avatar"
                alt='Sandeep Varma'
                src="/static/images/avatar/1.jpg"
            />

            <h3> {username} </h3>
         </div>
            
            {/* image */} 
            <img
                className="post_image" 
                src={imageUrl}
                alt="" 
            />

            {/* username + caption */}
            <h4 className="post_text"><strong>{username} </strong>{caption}</h4>

            {/* User comments */}


        <div className="post_comments">
                    {comments.map((comment) => (
                        <p>
                            <strong>{comment.username}</strong> {comment.text}
                        </p>
                    ))}
        </div>

        {user && (

             <form class="post_commentBox">
                <input
                    className="post_input"
                    type="text"
                    placeholder="Add a comment...."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} 
                />  

                <button
                    className="post_button"
                    disabled={!comment}
                    type="submit"
                    onClick={postComment}    
                >
                    Post
                </button>  
            </form>

        )}

        </div>
    )
}

export default Post
