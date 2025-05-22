"use client";
import React from "react";
import TitleHeading from "./components/TitleHeading";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAllLogsQuery } from "@/lib/redux/api/logApi";

export default function Logs() {
  // columns of table
  const columns = [
    { field: "id", headerName: "ID", width: 320, type: "string" },
    {
      field: "name",
      headerName: "Name",
      width: 270,
      type: "string",
    },
    {
      field: "conceptName",
      headerName: "concept:name",
      width: 270,
      type: "string",
    },
    {
      field: "numberOfTraces",
      headerName: "Number of Traces",
      width: 130,
      type: "number",
    },
    {
      field: "numberOfEvents",
      headerName: "Number of Events",
      width: 160,
      type: "number",
    },
  ];

  const { data: logs } = useGetAllLogsQuery();

  console.log(logs);

  // Format logs into rows
  const rows = logs?.map((log) => ({
    id: log.id,
    name: log.name,
    conceptName: log.attributes?.[0]?.log_has_attribute?.value ?? "N/A",
    numberOfEvents: log.event_count,
    numberOfTraces: log.trace_count,
  }));

  return (
    <>
      <TitleHeading title="Logs" height="10vh" subTitle={""} />
      <Box
        sx={{
          height: "85vh",
          flexGrow: 1,
        }}
      >
        <DataGrid
          rows={rows || []}
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
