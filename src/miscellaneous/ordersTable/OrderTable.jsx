import { DataGrid } from '@mui/x-data-grid';
import {ImBin2} from 'react-icons/im';
import {MdCancel} from 'react-icons/md';
import {AiOutlineReload} from 'react-icons/ai';
import { useContext, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';

export const OrderTable = ({OrderData, filtered}) => {
    const {searchItem} = useContext(SearchContext);
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [cancelLoading, setCancelLoading] = useState(false)
    const [currentOrder, setCurrentOrder] = useState(null)

    const {state} = useLocation();
    // console.log(state)

    const deleteOrder = async(id)=>{
        setCancelLoading(false);
        setDeleteLoading(true);
        setCurrentOrder(id)
        try {
            await axios.delete(`/orders/delete/${id}`);
            setDeleteLoading(false);
            setCurrentOrder(null)
        } catch (error) {
            console.log(error);
            setDeleteLoading(false);
            setCurrentOrder(null)
        }
    }
    const cancelOrder = async(id, sup, quantity, name)=>{
        setDeleteLoading(false);
        setCancelLoading(true);
        setCurrentOrder(id)
        const data = {sup, quantity, name}
        try {
            await axios.post(`/orders/cancel/`, data);
            setDeleteLoading(false);
            setCurrentOrder(null)
        } catch (error) {
            console.log(error);
            setDeleteLoading(false);
            setCurrentOrder(null)
        }
    }
   
   

      const columns = [
        
        {
            field:'sup',
            headerName: !state && 'Supplier',
            width: !state && 180,
            renderCell: (params)=>{
                return(
                    <>{
                        !state &&
                        <div style={{display:'flex', flexDirection:'row', gap:'0.5rem', alignItems:'center', justifyContent:'center'}} >
                            <img alt='logo' style={{width:'2.5rem', height:'2.5rem', borderRadius:'1.25rem', objectFit:'cover'}} src={params.row.sup?.pic} />
                            <span>{params.row.sup.name}</span>
                        </div>
                    }
                    </>
                )
            }
        },
        {
            field:'name',
            headerName: 'Product',
            width: 200,
        },
        {
          field: 'quantity',
          headerName: 'Quantity',
          type: 'number',
          width: 70,
        },
        
        {
          field: 'createdAt',
          headerName: 'Date',
          width: 170,
          renderCell:(params)=>{
            return(
                <span>{new Date(params.row.createdAt).toLocaleDateString()}</span>
            )
          }
        },

        {
            field:'id',
            headerName: '',
            width: 120,
            renderCell: (params)=>{
                return(
                    <div className="ditems" style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'0.8rem'}} >
                        {
                            deleteLoading && currentOrder === params.row._id ?
                            <AiOutlineReload size={20} color='teal' />:
                            <ImBin2 onClick={()=>deleteOrder(params.row._id)} size={24} style={{cursor:'pointer', color:'crimson'}} />
                        }
                        {
                            cancelLoading && currentOrder === params.row._id ?
                            <AiOutlineReload size={20} color='teal' />:
                            <MdCancel onClick={()=>cancelOrder(params.row._id, params.row.sup, params.row.quantity, params.row.name)} size={24} style={{cursor:'pointer', color:'orange'}} />
                        }
                    </div>
                )
            }
        },
        
      ];

    return(
        <div className='orderTable' style={{width:'100%'}} >
        <DataGrid
            getRowId={row=>row._id}
            rows={state ? filtered : OrderData}
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