import { Paper } from '@mui/material'
import React from 'react'

const PageContainer = ({ children }: any) => {
  return (
    <div className='paper-container'>
      <Paper elevation={0} className='page-container main-layer'>
        <div className='home-content-container'>{children}</div>
      </Paper>
      {/* <Paper elevation={0} className='page-container highlight-layer'></Paper> */}
    </div>
  )
}

export default PageContainer