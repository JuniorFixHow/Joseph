import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './productTable.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SearchContext } from '../../context/SearchContext';
import { baseURL } from '../../utils/functions/funtions';

export const DashProduct = () => {
  const {searchItem} = useContext(SearchContext);
  const [rows, setRows] = useState([]);

  useEffect(()=>{
    const fetchProducts = async()=>{
      const products = await axios.get('/products');
      setRows(products.data.sort((a, b)=> a.createdAt > b.createdAt ? 1:-1).slice(0, 11))
    }
    fetchProducts();
  },[rows])

    return  <TableContainer component={Paper} className='productTable' >
    <Table sx={{ minWidth: 450 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          {/* <TableCell  className='headCell' >Product ID</TableCell> */}
          <TableCell  className='headCell'>Name</TableCell>
          <TableCell  className='headCell'>Category</TableCell>
          <TableCell  className='quantCell'>Quantity</TableCell>
          <TableCell  className='headCell'>Price</TableCell>
          {/* <TableCell  className='tableCell'>Assignment Mode</TableCell>
          <TableCell  className='tableCell'>Status</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {searchItem(rows).map((row) => (
          <TableRow
            key={row._id}
          >
            {/* <TableCell className='tableCell' >{row.id}</TableCell>  */}
            {/* <TableCell className='tableCell'>{row.project}</TableCell> */}
            <TableCell className='tableCell'>
                <div className="cellWrapper">
                   <img src={row.pic} alt="" className="image" /> 
                   <span>{row.name}</span>
                   
                </div>
            </TableCell>
            <TableCell className='tableCell'>{row.cat}</TableCell>
            <TableCell className='tableCell'>{row.quantity}</TableCell>
            <TableCell className='tableCell'>{row.price}</TableCell>
            {/* <TableCell className='tableCell'>
                <span className={`status ${row.status}`}>{row.status}</span>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}


export const DashTresh = () => {
  const {searchItem} = useContext(SearchContext);
  const [rows, setRows] = useState([]);

  useEffect(()=>{
    const fetchProducts = async()=>{
      const products = await axios.get(baseURL+'/products');
      setRows(products.data.filter((a)=> a.quantity <= a.tresh).slice(0, 11))
    }
    fetchProducts();
  },[rows])

    
    return( 
    <>
    {
      rows.length > 0 ?
      <TableContainer component={Paper} className='productTable' >
        <Table  aria-label="simple table">
          
          <TableBody>
            {searchItem(rows).map((row) => (
              <TableRow
                key={row._id}
              >
              
                <TableCell className='tableCell'>
                    <div className="cellWrapper">
                      <img src={row.pic} alt="" className="image" />                    
                    </div>
                </TableCell>
                <TableCell className='tableCell'>
                  <div className="prodname">
                    <span className="ptitle">{row.name}</span>
                    <span className="prem">Remaining quantity: {row.quantity} packets </span>
                  </div>
                </TableCell>
                <TableCell className='lowCell'>Low</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
     </TableContainer>
     :
     <h1>No data</h1>
    }
  </>
  )
 
}

