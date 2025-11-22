import { useState } from "react";
import request from "../../../utils/request";
import { useParams } from "react-router";

export default function CreateComment({
    user,
    onCreate,
}) {
    const { gameId } = useParams();
    const [comment, setComment] = useState('');
    const changeHandler = (e) => {
        setComment(e.target.value);
    }
    const submitHandler = async () => {
        try {
            await request('/comments', 'POST', {
                author: user.email,
                message: comment,
                gameId,
            });
            setComment('');
            onCreate();
        } catch (err) {
            alert(err.message);
        }
    }

    //TODO {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
    return (
        <article className="create-comment">
            <label>Add new comment:</label>
            <form className="form" action={submitHandler}>
                <textarea
                    name="comment"
                    value={comment}
                    onChange={changeHandler}
                    placeholder="Comment......"
                ></textarea>
                <input
                    className="btn submit"
                    type="submit"
                    value="Add Comment"
                    disabled={!user}
                />
            </form>
        </article>
    );
}