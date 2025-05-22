import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const logApi = createApi({
  reducerPath: "logApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/" }),
  endpoints: (builder) => ({
    getAllLogs: builder.query({
      query: () => ({
        url: "logs",
        method: "GET",
      }),
    }),

    getLogWithMostTraces: builder.query({
      query: () => ({
        url: "logs/mostTraces",
        method: "GET",
      }),
    }),

    getLogWithLeastTraces: builder.query({
      query: () => ({
        url: "logs/leastTraces",
        method: "GET",
      }),
    }),

    getTraceWithMaxSequence: builder.query({
      query: (logId) => ({
        url: `logs/${logId}/getTraceWithMaxSequence`,
        method: "GET",
      }),
    }),

    getLogWithAttributes: builder.query({
      query: (logId) => ({
        url: `logs/${logId}/attributes`,
        method: "GET",
      }),
    }),

    getLogWithTraces: builder.query({
      query: (logId) => ({
        url: `logs/${logId}/traces`,
        method: "GET",
      }),
    }),

    getLogWithClassifiers: builder.query({
      query: (logId) => ({
        url: `logs/${logId}/classifiers`,
        method: "GET",
      }),
    }),

    getLogWithExtensions: builder.query({
      query: (logId) => ({
        url: `logs/${logId}/extensions`,
        method: "GET",
      }),
    }),

    getConceptNameForLog: builder.query({
      query: (logId) => ({
        url: `logs/${logId}/conceptName`,
        method: "GET",
      }),
    }),

    getLogsWithMinimumTraces: builder.query({
      query: (numTraces) => ({
        url: `logs/traces/minimum?numTraces=${numTraces}`,
        method: "GET",
      }),
    }),

    getLogsWithMaximumTraces: builder.query({
      query: (numTraces) => ({
        url: `logs/traces/maximum?numTraces=${numTraces}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllLogsQuery,
  useGetLogWithMostTracesQuery,
  useGetLogWithLeastTracesQuery,
  useGetTraceWithMaxSequenceQuery,
  useGetLogWithAttributesQuery,
  useGetLogWithTracesQuery,
  useGetLogWithClassifiersQuery,
  useGetLogWithExtensionsQuery,
  useGetConceptNameForLogQuery,
  useGetLogsWithMinimumTracesQuery,
  useGetLogsWithMaximumTracesQuery,
} = logApi;
