import React, { useEffect, useState } from 'react'
import './reportChart.css'
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import axios from 'axios';


export const ReportChart = () => {
    const data = [
        {
          name: 'January',
          Profit: 4000,
          Revenue: 2400,
          amt: 2400,
        },
        {
          name: 'February',
          Profit: 3000,
          Revenue: 1398,
          amt: 2210,
        },
        {
          name: 'March',
          Profit: 2000,
          Revenue: 9800,
          amt: 2290,
        },
        {
          name: 'April',
          Profit: 2780,
          Revenue: 3908,
          amt: 2000,
        },
        {
          name: 'May',
          Profit: 1890,
          Revenue: 4800,
          amt: 2181,
        },
        {
          name: 'June',
          Profit: 2390,
          Revenue: 3800,
          amt: 2500,
        },
        {
          name: 'July',
          Profit: 3490,
          Revenue: 4300,
          amt: 2100,
        },
      ];

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
        list.push({Purchases:t, name:d, Revenue:0, Profit:0})
      });
      const sales = await axios.get('/sales');
      sales.data.forEach(sale=>{
        const date = new Date(sale.updatedAt);
        const d = date.toDateString().split(' ')[1]+'/'+date.toDateString().split(' ')[3];
        // const t= prod.cost * prod.quantity;
        list.push({Revenue:sale.price, name:d, Purchases:0, Profit:sale.price})
      });
      const grouped = list.reduce((acc, cur)=>{
        const item = acc.length > 0 &&
        acc.find(res=>res.name === cur.name);
        if(item){
          // console.log('sales ', item.Sales)
          const loss = item.Purchases += cur.Purchases;
          const gain = item.Revenue += cur.Revenue;
          item.Revenue += cur.Revenue;
          // item.Purchases += cur.Purchases;
          item.Profit = gain - loss;
        }
        else{
          acc.push({name:cur.name, Revenue:cur.Revenue, Profit:cur.Profit, Purchases:cur.Purchases});
        }
        return acc;
      },[])
      grouped.length > 0 && setItems(grouped);
      // console.log(grouped);
    }
    fetchRecords();
  },[items])
  

  return (
    <div className='reportChart' >
      <LineChart
          width={700}
          height={400}
          data={items}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line strokeWidth={2} type="monotone" dataKey="Profit" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line strokeWidth={2} type="monotone" dataKey="Revenue" stroke="#82ca9d" />
        </LineChart>
    </div>
  )
}

