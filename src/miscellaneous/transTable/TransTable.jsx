import { DataGrid } from '@mui/x-data-grid';
import './transTable.css';
import {ImBin2} from 'react-icons/im';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {BsFillPencilFill} from 'react-icons/bs';
import {AiOutlineReload} from 'react-icons/ai';
import { SearchContext } from '../../context/SearchContext';

export const TransTable = ({setCurrentTransData, setShowNewTrans, currentHead}) => {
  const {searchItem} = useContext(SearchContext);
  const [rows, setRows] = useState([]);
  const [historyRows, setHistoryRows] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currentTrans, setCurrentTrans] = useState(null);

    const handleUpdateIcon =(data)=>{
      setShowNewTrans(true);
      setCurrentTransData(data);
    }

    const deleteProduct = async(id)=>{
      setDeleteLoading(true);
      setCurrentTrans(id);
      try {
        await axios.delete(`/sales/delete/${id}`);
        setDeleteLoading(false);
        setCurrentTrans(null);
      } catch (error) {
        console.log(error);
        setDeleteLoading(false);
        setCurrentTrans(null);
      }
    }
    useEffect(()=>{
      const fetchSales = async()=>{
        try {
          const sales = await axios.get('/sales');
          setRows(sales.data.sort((a, b)=>a.createdAt < b.createdAt ? 1:-1).filter(item=>
            new Date().toLocaleDateString() === new Date(item.createdAt).toLocaleDateString()
            ))
          setHistoryRows(sales.data.sort((a, b)=>a.createdAt < b.createdAt ? 1:-1).filter(item=>
            new Date().toLocaleDateString() < new Date(item.createdAt).toLocaleDateString()
            ))
        } catch (error) {
          console.log(error)
        }
      }
      fetchSales();

    },[rows])
  
// console.log(historyRows)
      const columns = [
        {
            field:'_id',
            headerName: '',
            width: 100,
            renderCell: (params)=>{
                return(
                    <div onClick={()=>handleUpdateIcon(params.row)} style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'row', gap:'1rem'}} >
                      <BsFillPencilFill color='teal' style={{cursor:'pointer'}} size={24} />
                      {
                        deleteLoading && currentTrans === params.row._id ?
                        <AiOutlineReload size={24} color='teal' />:
                        <ImBin2 color='crimson' onClick={()=>deleteProduct(params.row._id)} size={24} style={{cursor:'pointer'}} />
                      }
                    </div>
                )
            }
        },
        {
            field:'customer',
            headerName: 'Customer',
            width: 180,
            renderCell: (params)=>{
                return(
                    <div className="cust">
                        <span className='custname' >{params.row.customer}</span>
                        <span className='custphone' >{params.row?.phone || params.row?.address}</span>
                        {/* <span className='custphone' >{params.row?.address}</span> */}
                    </div>
                )
            }
        },
        {
            field:'product',
            headerName: 'Product',
            width: 200,
            renderCell: (params)=>{
                return(
                    <div className="cellWithImg">
                        {/* <img src={params.row.img} alt='pic' className="cellImg" /> */}
                        <span className="prodN">{params.row.product}</span>
                    </div>
                )
            }
        },
        {
          field: 'quantity',
          headerName: 'Quantity',
          type: 'number',
          width: 70,
        },
        {
          field: 'price',
          headerName: 'Price',
          type: 'number',
          width: 70,
        },
        
        {
          field: 'createdAt',
          headerName: 'Date',
          width: 170,
          renderCell:(params)=>{
            return(
              <span>{new Date(params.row.createdAt).toLocaleDateString() + '  '+ new Date(params.row.createdAt).toLocaleTimeString()}</span>
            )
          }
        },
        {
          field: 'seller',
          headerName: 'Attendant',
          width: 150,
          renderCell:(params)=>{
            return(
              <span>{params.row.seller?.fullname.split(' ')[0]}</span>
            )
          }
        },

        
        
      ];

      // console.log('current head ', currentHead)
    return(
        <div className='transTable'>
        <DataGrid
            getRowId={(row)=>row._id}
            rows={currentHead === 'a' ? searchItem(rows) : searchItem(historyRows)}
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