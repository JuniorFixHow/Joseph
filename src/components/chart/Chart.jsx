import { useEffect, useState } from 'react';
import './chart.css';
import { 
  AreaChart,
  Area,
  XAxis, 
  YAxis,
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Legend,
  Bar
} from 'recharts';
import axios from 'axios';



const data = [
  {
    name: 'January',
    Sales: 4000,
    Purchases: 2400,
    amt: 2400,
  },
  {
    name: 'February',
    Sales: 3000,
    Purchases: 1398,
    amt: 2210,
  },
  {
    name: 'March',
    Sales: 2000,
    Purchases: 9800,
    amt: 2290,
  },
  {
    name: 'April',
    Sales: 2780,
    Purchases: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    Sales: 1890,
    Purchases: 4800,
    amt: 2181,
  },
  {
    name: 'June',
    Sales: 2390,
    Purchases: 3800,
    amt: 2500,
  },
  {
    name: 'July',
    Sales: 3490,
    Purchases: 4300,
    amt: 2100,
  },
];



export const BarGraph = () => {
  const [items, setItems] = useState([]);
  useEffect(()=>{
    const fetchRecords =  async() =>{
      let list = [];
      const prods = await axios.get('/products');
      prods.data.forEach(prod=>{
        // console.log(prod)
        const date = new Date(prod.updatedAt);
        const d = date.toDateString().split(' ')[1]+'/'+date.toDateString().split(' ')[3];
        const t= prod.cost * prod.quantity;
        list.push({Purchases:t, name:d, Sales:0})
      });
      const sales = await axios.get('/sales');
      sales.data.forEach(sale=>{
        const date = new Date(sale.updatedAt);
        const d = date.toDateString().split(' ')[1]+'/'+date.toDateString().split(' ')[3];
        // const t= prod.cost * prod.quantity;
        list.push({Sales:sale.price, name:d, Purchases:0})
      });
      const grouped = list.reduce((acc, cur)=>{
        const item = acc.length > 0 &&
        acc.find(res=>res.name === cur.name);
        if(item){
          // console.log('sales ', item.Sales)
          item.Sales += cur.Sales;
          item.Purchases += cur.Purchases;
        }
        else{
          acc.push({name:cur.name, Sales:cur.Sales, Purchases:cur.Purchases});
        }
        return acc;
      },[])
      grouped.length > 0 && setItems(grouped);
      // console.log(grouped);
    }
    fetchRecords();
  },[items])
  



  return (
    <div className='chart' >
      <BarChart
          width={500}
          height={300}
          data={items}
          title='Sales and Purchases'
          // style={{}}
          // className=''
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Purchases" fill="#8884d8" />
          <Bar dataKey="Sales" fill="#82ca9d" />
        </BarChart>
    </div>
  )
}

