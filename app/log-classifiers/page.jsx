"use client";
import React, { useState } from "react";
import { Box, Button, TextField, Alert } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TitleHeading from "../components/TitleHeading";
import { useGetLogWithClassifiersQuery } from "@/lib/redux/api/logApi";

export default function LogsClassifiers() {
  const [logId, setLogId] = useState("");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  const { data: classifiers, isFetching } = useGetLogWithClassifiersQuery(logId);

  const columns = [
    {
      field: "logId",
      headerName: "Log ID",
      width: 320,
      type: "string",
    },
    {
      field: "classifierId",
      headerName: "Classifier ID",
      width: 320,
      type: "string",
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      type: "string",
    },
    {
      field: "keys",
      headerName: "Keys",
      width: 300,
      type: "string",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!classifiers?.classifiers || classifiers.classifiers.length === 0) {
      setError("No Classifiers found for the provided Log ID.");
      setRows([]);
    } else {
      setError("");
      const rows = classifiers.classifiers.map((classifier) => ({
        id: classifier.id,
        logId: classifiers.id,
        classifierId: classifier.id,
        name: classifier.name,
        keys: classifier.attr_keys.join(", "),
      }));
      setRows(rows);
    }
  };

  return (
    <>
      <TitleHeading title="Log's Classifiers" height="10vh" subTitle={""} />
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
            pagination: {
              paginationModel: { pageSize: 10 },
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
