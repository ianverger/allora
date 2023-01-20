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

        
    const handleClick = () => {
        if (includes) {
            dispatch(unlikeActivity(activityId))
        } else {
            dispatch(likeActivity(activityId))
        }
    }

    return (
        <>
        <div id="likes-wrapper">
            <div id="num-likes-wrapper">
                <span>{liked ? numLikes : ""}</span>
            </div>
            <button 
                className={includes ? "pink-button" : "gray-button"}
                onClick={handleClick}
                >
                {includes ? <i class="fa-solid fa-heart"></i> : <i class="fa-regular fa-heart"></i>}          
            </button>
        </div>
        </>
    )
}

export default LikesSection;