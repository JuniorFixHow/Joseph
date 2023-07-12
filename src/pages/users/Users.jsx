import React, { useContext, useState } from 'react';
import './users.css';
import { UsersTable } from '../../miscellaneous/usersTable/UsersTable';
import { ResetTable } from '../../miscellaneous/resetTable/ResetTable';
import NewUser from '../../components/newUser/NewUser';
import { AuthContext } from '../../context/AuthContext';

const Users = () => {
    const {user} = useContext(AuthContext);
    const[showNew, setShowNew] = useState(false);
  return (
    <div className='users' >
        {
            user.isAdmin ?
            <>
                <div className="top">
                    <div className="new">
                        <span className="us">Users</span>
                        <button onClick={()=>setShowNew(true)} className="newbut">Add new user</button>
                    </div>
                    <UsersTable />
                </div>
                <NewUser showNew={showNew} setShowNew={setShowNew} />
                <div className="top">
                    <div className="new">
                        <span className="us">Password reset requests</span>
                    </div>
                    <ResetTable />
                </div>
            </>
            :
            <span className='deny' >Access Denied!</span>
        }
    </div>
  )
}

export default Users