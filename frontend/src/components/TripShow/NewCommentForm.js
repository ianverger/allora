import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { createComment } from "../../store/comments";


function AddNewComment ({activityId, userId}) {
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        const comment = {text, activity: activityId, publisher: userId }
        dispatch(createComment(comment));
    }

    return (
        <div className='comment-box-container'>
            <form onSubmit={handleSubmit}>
                <div id='comment-input-wrapper'>
                    <input 
                    className='comment-box'
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength='500'
                    size='500'
                    placeholder="Comment here..."
                    />
                </div>
            </form>
                <button type='submit' className='comment-submit'>Post</button>
        </div>
    )

}

export default AddNewComment;