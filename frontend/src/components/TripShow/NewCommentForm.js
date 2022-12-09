import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { createComment } from "../../store/comments";


function AddNewComment ({tripId, activityId, userId}) {
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const comment = {text, activity: activityId, trip: tripId, publisher: userId }
        dispatch(createComment(comment));
        setText("");
    }

    return (
        <div className='comment-box-container'>
            <form onSubmit={handleSubmit} className='comment-form'>
                    <input 
                    className='comment-box'
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength='500'
                    size='500'
                    placeholder="Comment here..."
                    />
                <button type='submit' className='comment-submit'>Post</button>
            </form>
        </div>
    )

}

export default AddNewComment;