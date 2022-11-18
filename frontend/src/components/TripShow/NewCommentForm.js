import { useDispatch } from "react-redux";
import { createComment } from "../../store/comments";


function AddNewComment ({activityId, userId}) {
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    const handleSubmit = e => {
        const comment = {text, activity: activityId, publisher: userId }
        dispatch(createComment(comment));
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Comment here..."
            />
        </form>
    )

}

export default AddNewComment;