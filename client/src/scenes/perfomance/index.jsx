import React, { useState } from 'react'
import {
    Box, useTheme
} from "@mui/material";
import  { DataGrid } from "@mui/x-data-grid";
import { useGetUserPerfomanceQuery } from 'state/api'
import { useSelector } from 'react-redux';
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu"

const Perfomance = () => {
    const theme = useTheme();
    const userId = useSelector((state) => state.global.userId)
    console.log("🚀 ~ file: index.jsx:14 ~ Perfomance ~ userId:", userId)
    const {data, isLoading} = useGetUserPerfomanceQuery(userId);

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            flex: 1,
        },
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value.length
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        },
    ]

    
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="PERFOMANCE" subtitle="Track your Affiliate Sales Perfomance Here"/>
        <Box
          mt="40px"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
                border: "none"
            },
            "& .MuiDataGrid-cell": {
                borderBottom: "none"
            },
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderBottom: "none"
            },
            "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.primary.light,
                color: theme.palette.secondary[100],
                borderTop: "none"
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
            <DataGrid
              loading={isLoading || !data}
              getRowId={(row) => row._id}
              rows={(data  && data.sales) || []}            
              columns={columns}
              components={{
                ColumnMenu: CustomColumnMenu, 
              }}
            />
        </Box>
    </Box>    
  )
}

export default Perfomance