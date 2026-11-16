import React, { useEffect, useState } from 'react';
import style from '../style.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import swal from 'sweetalert';
import WithAlert from '../HOC/WithAlert';


const Posts = (props) => {
    const [post, setPost] = useState([]);
    const navigate = useNavigate;

    const { Confirm, Alert } = props;

    // GETTING POSTS
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
            setPost(res.data);
        }).catch(err => { console.log(err) })
    }, [])

    const handleSearch = () => { }

    // DELETING POSTS
    const handleDelete = async (itemId) => {
        swal(`آیا از حذف رکورد ${itemId} اطمینان دارید؟`);

        if (await Confirm(`آیا از حذف رکورد ${itemId} اطمینان دارید؟`)) {
            axios({
                method: "DELETE",
                url: `https://jsonplaceholder.typicode.com/users/${itemId}`
            }).then(res => {
                if (res.status == 200) {

                    const newUsers = post.filter(u => u.id !== itemId);
                    setPost(newUsers);

                    Alert("حذف با موفقیت انجام شد", "success");
                }
                else {
                    Alert("عملیات با خطا مواجه شد", "error");
                }
            })
        }
        else {
            Alert("شما منصرف شدید", "info");
        }
    }

    return (
        <div className={`${style.item_content} mt-5 p-4 container-fluid`}>
            <h4 className="text-center">مدیریت پست ها</h4>
            <div className="row my-2 mb-4 justify-content-between w-100 mx-0">
                <div className="form-group col-10 col-md-6 col-lg-4">
                    <input type="text" className="form-control shadow" placeholder="جستجو" onChange={handleSearch} />
                </div>

                <div className="col-2 text-start px-0">
                    <Link to="/post/add">
                        <button className="btn btn-success">
                            <i className="fas fa-plus text-light"></i>
                        </button>
                    </Link>
                </div>
            </div>

            {post.length ? (
                <table className="table bg-light shadow">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>آی دی کاربر</th>
                            <th>عنوان</th>
                            <th>متن</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {post.map(p => {
                            return (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.userId}</td>
                                    <td>{p.title}</td>
                                    <td>{p.body}</td>
                                    <td>
                                        <i className="fas fa-edit text-warning mx-2 pointer" onClick={() => {
                                            return navigate(`/post/add/${p.id}`);
                                        }}></i>

                                        <i className="fas fa-trash text-danger mx-2 pointer"
                                            onClick={() => { handleDelete(p.id) }}></i>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            ) : (
                <h4 className='text-center text-info'>لطفا صبر کنید....</h4>
            )}
        </div>
    )
}

export default WithAlert(Posts);