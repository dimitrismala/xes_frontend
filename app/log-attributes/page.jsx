"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TitleHeading from "../components/TitleHeading";
import { useGetLogWithAttributesQuery } from "@/lib/redux/api/logApi";

export default function LogsAttributes() {
  const [logId, setLogId] = useState("");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

const { data: logData, isFetching } = useGetLogWithAttributesQuery(logId);


  // columns of table
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 320,
      type: "string",
    },
    {
      field: "attributeKey",
      headerName: "Attribute key",
      width: 220,
      type: "string",
    },
    {
      field: "attributeType",
      headerName: "Attribute type",
      width: 130,
      type: "string",
    },
    {
      field: "value",
      headerName: "Value",
      width: 270,
      type: "string",
    },
    {
      field: "traceScope",
      headerName: "Trace scope",
      width: 100,
      type: "boolean",
    },
    {
      field: "eventScope",
      headerName: "Event scope",
      width: 100,
      type: "boolean",
    },
    {
      field: "parentId",
      headerName: "Parent ID",
      width: 320,
      type: "string",
    },
    {
      field: "prefix",
      headerName: "Prefix",
      width: 170,
      type: "string",
    },
  ];

const handleSubmit = (event) => {
  event.preventDefault();

  const log = logData?.[0]; // get the first log object

  if (!log || !log.attributes || log.attributes.length === 0) {
    setError("No Attributes found for the provided Log ID.");
    setRows([]);
    return;
  }

  setError("");

  const rows = log.attributes.map((attribute) => ({
    id: attribute.id,
    attributeKey: attribute.attr_key,
    attributeType: attribute.attr_type,
    value: attribute.log_has_attribute.value,
    traceScope: Boolean(attribute.log_has_attribute.trace_global),
    eventScope: Boolean(attribute.log_has_attribute.event_global),
    parentId: attribute.parent_id,
    prefix: attribute?.extension?.prefix,
  }));

  setRows(rows);
};


  return (
    <>
      <TitleHeading title="Log's Attributes" height="10vh" subTitle={""} />
      <Box
        sx={{
          height: "70vh",
          flexGrow: 1,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: "1rem" }}>
            <TextField
              id="logId"
              label="Log ID"
              variant="outlined"
              size="small"
              value={logId}
              onChange={(e) => setLogId(e.target.value)}
              sx={{ width: { xs: "100%", sm: "300px", md: "350px" } }}
            />
            <Typography variant="body1" component="h6">
              Log's total global attribute:{" "}
              {logData?.[0]?.attributes?.length ?? "-"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-start", m: "1em" }}>
            <Button
              type="submit"
              variant="contained"
              disabled={!logId || isFetching}
            >
              {isFetching ? "Searching..." : "Submit"}
            </Button>
          </Box>
        </form>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

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
