"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TitleHeading from "../components/TitleHeading";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useGetEventsByTimestampRangeQuery } from "@/lib/redux/api/eventApi";

export default function EventsTimeRange() {
  const [traceId, setTraceId] = useState("");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(""); // Error message state

  const { data: events, isFetching } = useGetEventsByTimestampRangeQuery({
    from: from,
    to: to,
    traceId: traceId,
  });

  // Table columns definition
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
      field: "timestamp",
      headerName: "time:timestamp",
      width: 200,
      type: "string",
    },
  ];

  // Form submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    setError(""); // Clear any existing errors

    if (!events || events.length === 0) {
      setError("No Events found for the given Trace Id and time range.");
      setRows([]);
    } else {
      const rows = events.map((event) => {
        const conceptNameAttr = event.attributes.find(
          (attr) => attr.attr_key === "concept:name"
        );
        const conceptName = conceptNameAttr?.event_has_attribute?.value || "-";

        const timestampAttr = event.attributes.find(
          (attr) => attr.attr_key === "time:timestamp"
        );
        const rawTimestamp = timestampAttr?.event_has_attribute?.value || null;

        const formattedTimestamp =
          rawTimestamp && dayjs(rawTimestamp).isValid() ? rawTimestamp : null;

        return {
          id: event.id,
          con: conceptName,
          timestamp: formattedTimestamp,
        };
      });

      setRows(rows || []);
    }
  };

  const handleDateFrom = (value) => {
    setFrom(value ? value.format("YYYY-MM-DD") : null);
  };

  const handleDateTo = (value) => {
    setTo(value ? value.format("YYYY-MM-DD") : null);
  };

  return (
    <>
      <TitleHeading title="Events - Time Range" height="10vh" subTitle={""} />
      <Box sx={{ height: "70vh", flexGrow: 1 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: "1rem" }}>
            <TextField
              id="traceId"
              label="Trace ID"
              variant="outlined"
              size="small"
              value={traceId}
              onChange={(e) => setTraceId(e.target.value)}
              sx={{ width: { xs: "100%", sm: "300px", md: "350px" } }}
            />
          </Box>
          <Box sx={{ marginBottom: "1rem", display: "flex" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="From" onChange={handleDateFrom} />
            </LocalizationProvider>
            <Box sx={{ marginLeft: "1rem" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="To" onChange={handleDateTo} />
              </LocalizationProvider>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-start", m: "1em" }}>
            <Button
              type="submit"
              variant="contained"
              disabled={!traceId || !from || !to || isFetching}
            >
              {isFetching ? "Fetching..." : "Submit"}
            </Button>
          </Box>
        </form>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* DataGrid */}
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
