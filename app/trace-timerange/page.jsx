"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TitleHeading from "../components/TitleHeading";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useGetTracesByTimestampRangeQuery } from "@/lib/redux/api/traceApi";

export default function TracesTimeRange() {
  const [logId, setLogId] = useState("");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  const { data: traces, isFetching } = useGetTracesByTimestampRangeQuery({
    from: from,
    to: to,
    logId: logId,
  });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 320,
      type: "string",
    },
    {
      field: "con",
      headerName: "concept:name",
      width: 250,
      type: "string",
    },
    {
      field: "numberOfEvents",
      headerName: "Number of Events",
      width: 130,
      type: "number",
    },
    {
      field: "timestamp",
      headerName: "time:timestamp",
      width: 200,
      type: "string",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!traces || traces.length === 0) {
      setError("No Traces found for the provided Log ID and time range.");
      setRows([]);
    } else {
      setError("");
      const rows = traces.map((trace) => {
        const conceptNameAttr = trace.attributes.find(
          (attr) => attr.attr_key === "concept:name"
        );
        const conceptName = conceptNameAttr?.trace_has_attribute?.value || "-";

        const timestampAttr = trace.attributes.find(
          (attr) => attr.attr_key === "time:timestamp"
        );
        const rawTimestamp = timestampAttr?.trace_has_attribute?.value || null;

        const formattedTimestamp =
          rawTimestamp && dayjs(rawTimestamp).isValid() ? rawTimestamp : null;

        return {
          id: trace.id,
          con: conceptName,
          numberOfEvents: trace.event_count,
          timestamp: formattedTimestamp,
        };
      });

      setRows(rows || []);
    }
  };

  const HandleDateFrom = (value) => {
    if (value !== null) {
      setFrom(value.format("YYYY-MM-DD"));
    } else {
      setFrom(null);
    }
  };

  const HandleDateTo = (value) => {
    if (value !== null) {
      setTo(value.format("YYYY-MM-DD"));
    } else {
      setTo(null);
    }
  };

  return (
    <>
      <TitleHeading title="Traces - Time Range" height="10vh" subTitle={""} />
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
          </Box>
          <Box sx={{ marginBottom: "1rem", display: "flex" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label={"From "} onChange={HandleDateFrom} />
            </LocalizationProvider>
            <Box sx={{ marginLeft: "1rem" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label={"To"} onChange={HandleDateTo} />
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-start", m: "1em" }}>
            <Button
              type="submit"
              variant="contained"
              disabled={!logId || !from || !to || isFetching}
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
