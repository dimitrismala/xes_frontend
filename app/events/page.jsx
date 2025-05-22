"use client";
import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TitleHeading from "../components/TitleHeading";
import { useGetAllEventsQuery } from "@/lib/redux/api/eventApi";

export default function Events() {
  // columns of table
  const columns = [{ field: "id", headerName: "ID", width: 300 }];

  const { data: events } = useGetAllEventsQuery();

  console.log(events);

  // dummy data
  const rows = [
    { id: "0380d286-a84c-4d69-9d69-deabb3ef0fd9" },
    { id: "0ee41abe-3463-4927-807d-01a9fd521090" },
    { id: "11f5ec1f-2a36-4cf1-b8e8-646322f9a568" },
    { id: "149a9334-ae14-4925-9b17-4ebb6080119f" },
    { id: "22f2ede0-a8a0-436c-b828-c05e8ef27fb5" },
    { id: "249e4943-c8ec-4be4-bd14-3c95759beb82" },
    { id: "298b6680-64c8-4db1-b571-cfabcc3f011f" },
  ];

  return (
    <>
      <TitleHeading title="Events" height="10vh" subTitle={""} />
      <Box
        sx={{
          height: "85vh",
          flexGrow: 1,
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
