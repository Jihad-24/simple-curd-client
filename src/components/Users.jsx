/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Users = () => {

    const loadUsers = useLoaderData();
    const [users, setUsers] = useState(loadUsers);
    

    const handleDelete = (_id) => {
        console.log('delete', _id);
        fetch(`http://localhost:5000/users/${_id}`, {
            method: "DELETE",
            
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert('delete successfully');
                    const remaining = users.filter(user => user._id !== _id);
                    setUsers(remaining);
                }
        })
    }

    return (
        <div>
            <h1>All Users : {users?.length}</h1>
            <div className="">
                {
                    users.map(user =>
                        <h2 key={user?._id}>
                            <br />
                            {user?.name}
                            <br />
                            {user?.email}
                            <Link to={`/update/${user?._id}`}>
                                <button>Update</button>
                            </Link>
                            <button
                                onClick={()=>handleDelete(user?._id)}
                            >X</button>
                        </h2>)
                }
            </div>
        </div>
    );
};

export default Users;