import { DataGrid } from '@mui/x-data-grid';
import './usersTable.css';
import {ImBin2} from 'react-icons/im';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {AiOutlineReload} from 'react-icons/ai';
import { SearchContext } from '../../context/SearchContext';
import { baseURL } from '../../utils/functions/funtions';

export const UsersTable = () => {
    const {searchItem} = useContext(SearchContext);
    const [rows, setRows] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(()=>{
        const fetchUsers = async()=>{
            const users = await axios.get(baseURL+'/users');
            setRows(users.data.sort((a, b)=>a.createdAt < b.createdAt ? 1:-1));
        }
        fetchUsers()
    },[rows])

    const deleteProduct = async(id)=>{
        setCurrentUser(id);
        setDeleteLoading(true);
        try {
            await axios.delete(`${baseURL}/users/delete/${id}`);
            setCurrentUser(null);
            setDeleteLoading(false);
        } catch (error) {
            console.log(error)
            setCurrentUser(null);
            setDeleteLoading(false);
        }
    }
   
    const columns = [
       
        
        {
            field:'pic',
            headerName: 'User',
            width: 250,
            renderCell: (params)=>{
                return(
                    <div className="cellWithImg">
                        <img src={params.row.pic} alt='pic' className="cellImg" />
                        <span className="prodN">{params.row.fullname}</span>
                    </div>
                )
            }
        },
       
        {
          field: 'phone',
          headerName: 'Contact',
          width: 130,
        },

        {
          field: 'email',
          headerName: 'Email',
          width: 150,
        },
        
        {
            field: 'isAdmin',
            headerName: 'Admin',
            width: 100,
          },

        {
            field:'_id',
            headerName: '',
            width: 20,
            renderCell: (params)=>{
                return(
                    <>
                    {
                        deleteLoading && currentUser === params.row._id ?
                        <AiOutlineReload size={24} color='teal' />:
                        <ImBin2 onClick={()=>deleteProduct(params.row._id)} size={20} color='crimson' style={{cursor:'pointer'}} />
                    }
                    </>
                )
            }
        },
        
      ];

    return(
        <div className='usersTable'>
        <DataGrid
            getRowId={(row)=>row._id}
            rows={searchItem(rows)}
            columns={columns}
            initialState={{
            pagination: {
                paginationModel: { page: 0, pageSize: 5 },
            },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
        />
    </div>
    )


}