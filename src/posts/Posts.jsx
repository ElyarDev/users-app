import React, { useEffect, useState } from 'react';
import style from '../style.module.css'
import axios from 'axios';

const Posts = () => {
    const [post, setPost] = useState([])

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
            setPost(res.data);
        }).catch(err => { console.log(err) })
    }, [])

    return (
        <div className={`${style.item_content} mt-5 p-4 container-fluid`}>
            <h4 className="text-center">مدیریت پست ها</h4>
        </div>
    )

}

export default Posts;