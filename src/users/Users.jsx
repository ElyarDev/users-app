import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import style from '../style.module.css';

import swal from 'sweetalert';
import axios from 'axios';
import WithAlert from '../HOC/WithAlert';

const Users = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    const [mainUser, setMainUser] = useState();

    const { Confirm, Alert } = props;

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                setUser(res.data);
                setMainUser(res.data);
            }).catch(err => {
                console.log(err);
            })
    }, [])

    // DELETE WITH SWEETALERT AND USING HOC
    const handleDelete = async (itemId) => {
        swal(`آیا از حذف رکورد ${itemId} اطمینان دارید؟`);



        if (await Confirm(`آیا از حذف رکورد ${itemId} اطمینان دارید؟`)) {
            axios({
                method: "DELETE",
                url: `https://jsonplaceholder.typicode.com/users/${itemId}`
            }).then(res => {
                if (res.status == 200) {

                    const newUsers = user.filter(u => u.id !== itemId);
                    setUser(newUsers);

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

    // SEARCH USER
    const handleSearch = (e) => {
        setUser(mainUser.filter(u => u.name.includes(e.target.value)));
    }

    return (
        <div className={`${style.item_content} mt-5 p-4 container-fluid`}>
            <h4 className="text-center">مدیریت کاربران</h4>
            <div className="row my-2 mb-4 justify-content-between w-100 mx-0">
                <div className="form-group col-10 col-md-6 col-lg-4">
                    <input type="text" className="form-control shadow" placeholder="جستجو" onChange={handleSearch} />
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
                                            return navigate(`/user/add/${u.id}`);
                                        }}></i>

                                        <i className="fas fa-trash text-danger mx-2 pointer"
                                            onClick={() => { handleDelete(u.id) }}></i>
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
// export default WithAlert(Users);