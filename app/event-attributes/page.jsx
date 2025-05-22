"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TitleHeading from "../components/TitleHeading";
import { useGetEventAttributesQuery } from "@/lib/redux/api/eventApi";

export default function EventAttributes() {
  const [eventId, setEventId] = useState("");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const { data: attributes, isFetching } = useGetEventAttributesQuery(eventId, {skip: !eventId});

  const columns = [
    {
      field: "id",
      headerName: "Attribute ID",
      width: 320,
      type: "string",
    },
    {
      field: "attributeKey",
      headerName: "Attribute Key",
      width: 220,
      type: "string",
    },
    {
      field: "attributeType",
      headerName: "Attribute Type",
      width: 140,
      type: "string",
    },
    {
      field: "value",
      headerName: "Value",
      width: 320,
      type: "string",
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
      width: 150,
      type: "string",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!attributes || !attributes.attributes || attributes.attributes.length === 0) {
      setError("No Attributes found for the provided Event ID.");
      setRows([]);
    } else {
      setError("");
      const rows = attributes.attributes.map((attribute) => ({
        id: attribute.id,
        attributeKey: attribute.attr_key,
        attributeType: attribute.attr_type,
        value: attribute.event_has_attribute.value,
        parentId: attribute.parent_id,
        prefix: attribute.extension?.prefix || null,
      }));

      setRows(rows);
    }
  };

  return (
    <>
      <TitleHeading title="Event's Attributes" height="10vh" subTitle="" />
      <Box
        sx={{
          height: "70vh",
          flexGrow: 1,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: "1rem" }}>
            <TextField
              id="eventId"
              label="Event ID"
              variant="outlined"
              size="small"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              sx={{ width: { xs: "100%", sm: "300px", md: "350px" } }}
            />
            <Typography variant="body1" component="h6" sx={{ mt: 1 }}>
              Event's total attributes: {attributes?.attributes?.length || "-"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-start", m: "1em" }}>
            <Button type="submit" variant="contained" disabled={!eventId || isFetching}>
              {isFetching ? "Fetching..." : "Submit"}
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
