import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likeActivity, unlikeActivity } from '../../store/activities';

function LikesSection ({likes, currentUserId, activityId}) {
    const dispatch = useDispatch();
    const numLikes = likes.length;
    const [hover, setHover] = useState(false);

    let liked = false;
    if (likes.length >= 1) {
        liked = true;
    }

    let includes = false;
    if (likes.includes(currentUserId)) {
        includes = true;
    }

    const handleIncludesClick = () => {
        dispatch(unlikeActivity(activityId))
    }

    const handleNotIncludesClick = () => {
        dispatch(likeActivity(activityId))
    }

    return (
        <>
        <div id="likes-wrapper">
            <div id="num-likes-wrapper">
                <span>{numLikes}</span>
            </div>
            <button 
                className={liked ? "green-button" : "gray-button"}
                onClick={includes ? `${handleIncludesClick}` : `${handleNotIncludesClick}`}
                >
                <i className="fa-solid fa-thumbs-up"></i>
            </button>
        </div>
        </>
    )
}

export default LikesSection;