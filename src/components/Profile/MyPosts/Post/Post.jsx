import React from 'react';
import s from './Post.module.css'

const Post = (props) => {
    return (
            <div className={s.item}>
                <img src='https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800' />
                {props.message}
                <div>
                    <span>like</span> {props.likesCount}
                </div>
            </div>
    );
}
export default Post;