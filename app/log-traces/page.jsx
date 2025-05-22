"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TitleHeading from "../components/TitleHeading";
import { useGetLogWithTracesQuery } from "@/lib/redux/api/logApi";

export default function LogsTraces() {
  const [logId, setLogId] = useState("");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  const { data: traces, isFetching } = useGetLogWithTracesQuery(logId);

  const columns = [
    {
      field: "traceId",
      headerName: "Trace ID",
      width: 320,
      type: "string",
    },
    {
      field: "conceptName",
      headerName: "concept:name",
      width: 270,
      type: "string",
    },
    {
      field: "timestamp",
      headerName: "time:timestamp",
      width: 170,
      type: "string",
    },
    {
      field: "numberOfEvents",
      headerName: "Number of Events",
      width: 130,
      type: "number",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!traces?.traces?.length) {
      setError("No Traces found for the provided Log ID.");
      setRows([]);
    } else {
      setError("");
      const rows = traces.traces.map((trace) => ({
        id: trace.id,
        traceId: trace.id,
        conceptName:
          trace.attributes.find((attr) => attr.attr_key === "concept:name")
            ?.trace_has_attribute.value || "-",
        timestamp:
          trace.attributes.find((attr) => attr.attr_key === "time:timestamp")
            ?.trace_has_attribute.value || "-",
        numberOfEvents: trace.event_count,
      }));

      setRows(rows);
    }
  };

  return (
    <>
      <TitleHeading title="Log's Traces" height="10vh" subTitle={""} />
      <Box sx={{ height: "70vh", flexGrow: 1 }}>
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
              Log's total traces: {traces?.trace_count ?? "-"}
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
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
