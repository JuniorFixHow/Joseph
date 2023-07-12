import React, { useContext } from 'react'
import './report.css';
import { ReportChart } from '../../miscellaneous/reportTable/ReportChart';
import { ReportData } from '../../miscellaneous/reportData/ReportData';
import { AuthContext } from '../../context/AuthContext';

const Report = () => {
  const {user} = useContext(AuthContext);
  return (
    <div className='report' >
      {
        user.isAdmin ?
        <>
          <div className="top">
              <span className="title">Profit and Revenue</span>
              <ReportChart />
          </div>
          <div className="top">
              <span className="title">Selling Products</span>
              <ReportData />
          </div>
        </>
        :
        <span className='deny'>Access Denied!</span>
      }
    </div>
  )
}

export default Report