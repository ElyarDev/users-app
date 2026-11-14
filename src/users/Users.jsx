import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import style from '../style.module.css';

import swal from 'sweetalert';
import axios from 'axios';

const Users = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                setUser(res.data);
            }).catch(err => {
                console.log(err);
            })
    }, [])

    // sweet alert
    const handleDelete = (itemId) => {
        swal(`آیا از حذف رکورد ${itemId} اطمینان دارید؟`);

        swal({
            title: 'حذف رکورد',
            text: `آیا از حذف رکورد ${itemId} اطمینان دارید؟`,
            icon: 'warning',
            buttons: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("با موفقیت حذف شد", {
                        icon: 'success'
                    })
                }
                else {
                    swal('رکورد پاک نشد')
                }
            })
    }

    return (
        <div className={`${style.item_content} mt-5 p-4 container-fluid`}>
            <h4 className="text-center">مدیریت کاربران</h4>
            <div className="row my-2 mb-4 justify-content-between w-100 mx-0">
                <div className="form-group col-10 col-md-6 col-lg-4">
                    <input type="text" className="form-control shadow" placeholder="جستجو" />
                </div>

                <div className="col-2 text-start px-0">
                    <Link to="/user/add">
                        <button className="btn btn-success">
                            <i className="fas fa-plus text-light"></i>
                        </button>
                    </Link>
                </div>
            </div>

            {user.length ? (
                <table className="table bg-light shadow">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>نام</th>
                            <th>نام کاربری</th>
                            <th>ایمیل</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map(u => {
                            return (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.username}</td>
                                    <td>{u.email}</td>
                                    <td>
                                        {/* <Link to={"/user/add/2"}>
                                <i className="fas fa-edit text-warning mx-2 pointer"></i>
                            </Link> */}

                                        <i className="fas fa-edit text-warning mx-2 pointer" onClick={() => {
                                            return navigate("/user/add/2", { state: "id" });
                                        }}></i>

                                        <i className="fas fa-trash text-danger mx-2 pointer"
                                            onClick={() => { handleDelete(1) }}></i>
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

export default Users;