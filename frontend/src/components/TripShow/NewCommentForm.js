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
        <div>
        <form onSubmit={handleSubmit}>
            <input 
            className='comment-box'
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Comment here..."
            />
            <button type='submit' className='comment-submit'>Submit</button>
        </form>
            </div>
    )

}

export default AddNewComment;