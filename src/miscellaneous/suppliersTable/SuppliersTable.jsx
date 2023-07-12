import { DataGrid } from '@mui/x-data-grid';
import './suppliersTable.css';
import {ImBin2} from 'react-icons/im';
import { Sups } from '../../utils/dummy/SuppliersData';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {AiOutlineReload} from 'react-icons/ai';
import { SearchContext } from '../../context/SearchContext';

export const SuppliersTable = () => {
    const {searchItem} = useContext(SearchContext);
    const [rows, setRows] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [currentDelete, setCurrentDelete] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchSuppliers = async ()=>{
            const sups = await axios.get('/suppliers');
            setRows(sups.data);
          }
          fetchSuppliers();
    },[rows])

    const deleteProduct = async(id)=>{
        setDeleteLoading(true);
        setCurrentDelete(id);
        try {
            await axios.delete(`/suppliers/delete/${id}`)
            setDeleteLoading(false);
            setCurrentDelete(null);
        } catch (error) {
            setDeleteLoading(false)
            console.log(error);
            setCurrentDelete(null);
        }
    }
   
    const handleGotoSupplier =(id, name, cat, loc, phone, img, email)=>{
        navigate('/orders', {state:
            {
                id,
                name,
                cat,
                loc,
                phone,
                img,
                email
            }})
    }
    const columns = [
       
        
        {
            field:'pic',
            headerName: 'Supplier',
            width: 250,
            renderCell: (params)=>{
                return(
                    <div onClick={()=>handleGotoSupplier(params.row._id, params.row.name, params.row.category, params.row.location, params.row.phone, params.row.pic, params.row.email )} className="cellWithImg">
                        <img src={params.row.pic} alt='pic' className="cellImg" />
                        <span className="prodN">{params.row.name}</span>
                    </div>
                )
            }
        },
        {
          field: 'location',
          headerName: 'Loaction',
          width: 130,
        },
        {
          field: 'cat',
          headerName: 'Category',
          width: 160,
        },
        {
          field: 'phone',
          headerName: 'Contact',
          width: 130,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 180,
        },
        

        {
            field:'_id',
            headerName: '',
            width: 20,
            renderCell: (params)=>{
                return(
                    <>
                    {
                        deleteLoading && currentDelete === params.row._id ?
                        <AiOutlineReload size={20} color='teal' />:
                        <ImBin2 onClick={()=>deleteProduct(params.row._id)} size={20} color='crimson' style={{cursor:'pointer'}} />
                    }
                    </>
                )
               
            }
        },
        
      ];

    return(
        <div className='supTable'>
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