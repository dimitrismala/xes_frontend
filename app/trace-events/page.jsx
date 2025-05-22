"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TitleHeading from "../components/TitleHeading";
import { useGetEventsForTraceQuery } from "@/lib/redux/api/traceApi";

export default function LogsAttributes() {
  const [traceId, setTraceId] = useState("");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  const { data: events, isFetching } = useGetEventsForTraceQuery(traceId);

  const columns = [
    {
      field: "eventId",
      headerName: "Event ID",
      width: 320,
      type: "string",
    },
    {
      field: "conceptName",
      headerName: "concept:name",
      width: 220,
      type: "string",
    },
    {
      field: "timestamp",
      headerName: "time:timestamp",
      width: 160,
      type: "string",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!events || !events.events || events.events.length === 0) {
      setError("No Events found for the provided Trace ID.");
      setRows([]);
    } else {
      setError("");
      const rows = events.events.map((event) => {
        const conceptName = event.attributes.find(
          (attr) => attr.attr_key === "concept:name"
        )?.event_has_attribute.value;

        const timestamp = event.attributes.find(
          (attr) => attr.attr_key === "time:timestamp"
        )?.event_has_attribute.value;

        return {
          id: event.id, // Unique ID for DataGrid
          eventId: event.id,
          conceptName: conceptName || "",
          timestamp: timestamp || "",
        };
      });

      setRows(rows);
    }
  };

  return (
    <>
      <TitleHeading title="Trace's Events" height="10vh" subTitle={""} />
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
            <Typography variant="body1" component="h6">
              Trace's total Events: {events?.events?.length || "-"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-start", m: "1em" }}>
            <Button type="submit" variant="contained" disabled={!traceId || isFetching}>
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
