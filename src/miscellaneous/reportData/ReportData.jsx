import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import './reportData.css';
import axios from 'axios';
import { SearchContext } from '../../context/SearchContext';
import { baseURL } from '../../utils/functions/funtions';

export const ReportData = () => {
  const {searchItem} = useContext(SearchContext);
  const [products, setProducts] = useState([]);

  const getOccurances = (arr, val)=>{
    return arr.map(item=>item.product).reduce((acc, elem)=> val ===elem ? acc+1 : acc, 0)
  }
  useEffect(()=>{
    const getProducts = async()=>{
      const prods = await axios.get(baseURL+'/products');
      const sal = await axios.get(baseURL+'/sales');
      setProducts(prods.data.sort((a, b)=> getOccurances(sal.data, a.name) < getOccurances(sal.data, b.name) ? 1:-1).slice(0, 6));
    }
   
    getProducts();
  },[products])


  return <TableContainer component={Paper} className='reportData' >
  <Table sx={{ minWidth: 450 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        {/* <TableCell  className='headCell' >Product ID</TableCell> */}
        <TableCell  className='headCell'>Name</TableCell>
        <TableCell  className='headCell'>Category</TableCell>
        <TableCell  className='headCell'>Remaining quantity</TableCell>
        {/* <TableCell  className='tableCell'>Assignment Mode</TableCell>
        <TableCell  className='tableCell'>Status</TableCell> */}
      </TableRow>
    </TableHead>
    <TableBody>
      {searchItem(products).map((row) => (
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
          {/* <TableCell className='tableCell'>
              <span className={`status ${row.status}`}>{row.status}</span>
          </TableCell> */}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
}




