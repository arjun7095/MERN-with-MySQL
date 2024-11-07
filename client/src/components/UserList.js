import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../features/users/userSlice';

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const status = useSelector((state) => state.users.status);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers());
        }
    }, [status, dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    };

    return (
        <div>
            <h2>User List</h2>
            {users.map((user) => (
                <div key={user.id}>
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default UserList;
