import { DataGrid } from '@mui/x-data-grid';
import './resetTable.css';
import {ImBin2} from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import {AiOutlineReload} from 'react-icons/ai';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../context/SearchContext';

export const ResetTable = () => {
    const {searchItem} = useContext(SearchContext);
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [currentReset, setCurrentReset] = useState(null);
    const deleteRequest = async(id, email)=>{
        setDeleteLoading(true);
        setCurrentReset(id);
        try {
            await axios.post(`/reset/delete`, {email})
            setDeleteLoading(false);
            setCurrentReset(null);
        } catch (error) {
            console.log(error);
            setDeleteLoading(false);
            setCurrentReset(null);
        }
    }

    useEffect(()=>{
        const fetchRequests = async() =>{
            try {
                const reqs = await axios.get('/reset');
                setRequests(reqs.data.sort((a, b)=>a.createdAt < b.createdAt ? 1:-1));
            } catch (error) {
                console.log(error)
            }
        }
        fetchRequests()
    },[requests])
//    console.log(requests);
    const handleGotoReset =(email, id)=>{
        navigate('/profile/reset', {state: {email, id} })
            
    }
    const columns = [        
        {
          field: 'email',
          headerName: 'Email',
          width: 150,
        },
        {
          field: 'createdAt',
          headerName: 'Date',
          width: 180,
          renderCell:(params)=>{
            return(
                <span>{new Date(params.row.createdAt).toLocaleDateString()}</span>
            )
          }
        },

        {
            field:'_id',
            headerName: '',
            width: 160,
            renderCell: (params)=>{
                return(
                    <div className="viewreset">
                        {
                            deleteLoading && currentReset === params.row._id ?
                            <AiOutlineReload size={24} color='teal' />:
                            <button onClick={()=>deleteRequest(params.row._id, params.row.email)} className="delreset">Delete</button>
                        }
                        <button onClick={()=>handleGotoReset(params.row.email, params.row._id)} className="checkreset">Reset</button>
                    </div>
                )
            }
        },
        
      ];

    return(
        <div className='resetTable'>
        {
            requests.length > 0 &&
            <DataGrid
                getRowId={(row)=>row._id}
                rows={searchItem(requests)}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        }
    </div>
    )


}