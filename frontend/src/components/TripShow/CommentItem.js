import React from "react";

function CommentItem ({text, publisherName}) {

    return (
        <>
        <div className="comment-item-container">
            <div id='commenter'>
                <i id='pro-pic-in-comment' className="fas fa-user-circle"></i>
            </div>
            <div id='comment-text'>{text}</div>
        </div>
        </>
    )
}

export default CommentItem;