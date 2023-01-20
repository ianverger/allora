import React from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../store/comments";

function CommentItem ({commentId, text, publisher, currentUserId}) {
    const dispatch = useDispatch();


    const handleClick = () => {
        dispatch(deleteComment(commentId));
    }

    let showDelete = false;
    if (currentUserId === publisher._id) {
        showDelete = true;
    }

    console.log(publisher.username)
    return (
        <>
        <div className="comment-item-container">
            <div id='commenter'>
                <i id='pro-pic-in-comment' className="fas fa-user-circle"></i>
                <p id="publisher-name">{publisher.username}</p>
            </div>
            <div id='comment-text'>{text}</div>
            {showDelete ? 
                <button 
                    className="delete-comment-button"
                    onClick={handleClick}>
                    <i className="fa fa-trash-o"></i>
                </button>
             : null } 

        </div>
        </>
    )
}

export default CommentItem;