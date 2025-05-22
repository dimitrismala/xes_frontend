import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const traceApi = createApi({
  reducerPath: "traceApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/" }),
  endpoints: (builder) => ({
    getAllTraces: builder.query({
      query: () => ({
        url: "traces",
        method: "GET",
      }),
    }),

    getTraceById: builder.query({
      query: (traceId) => ({
        url: `traces/${traceId}`,
        method: "GET",
      }),
    }),

    getTraceWithAttributes: builder.query({
      query: (traceId) => ({
        url: `traces/${traceId}/attributes`,
        method: "GET",
      }),
    }),

    getTraceWithMostEvents: builder.query({
      query: () => ({
        url: "traces/mostEvents",
        method: "GET",
      }),
    }),

    getTraceWithLeastEvents: builder.query({
      query: () => ({
        url: "traces/leastEvents",
        method: "GET",
      }),
    }),

    getTracesWithMinimumEvents: builder.query({
      query: (numEvents) => ({
        url: `traces/events/minimum?numEvents=${numEvents}`,
        method: "GET",
      }),
    }),

    getTracesWithMaximumEvents: builder.query({
      query: (numEvents) => ({
        url: `traces/events/maximum?numEvents=${numEvents}`,
        method: "GET",
      }),
    }),

    getEventsForTrace: builder.query({
      query: (traceId) => ({
        url: `traces/${traceId}/events`,
        method: "GET",
      }),
    }),

    getConceptNameForTrace: builder.query({
      query: (traceId) => ({
        url: `traces/${traceId}/conceptName`,
        method: "GET",
      }),
    }),

    getTracesByConceptName: builder.query({
      query: (conceptName) => ({
        url: `traces/hasConceptName?conceptName=${conceptName}`,
        method: "GET",
      }),
    }),

    getEventWithMaxSequence: builder.query({
      query: (traceId) => ({
        url: `traces/${traceId}/getEventWithMaxSequence`,
        method: "GET",
      }),
    }),

    getTracesByTimestamp: builder.query({
      query: (timestamp) => ({
        url: `traces/time?timestamp=${timestamp}`,
        method: "GET",
      }),
    }),

    getTracesByTimestampRange: builder.query({
      query: ({ from, to, logId }) => ({
        url: "traces/timeRange",
        method: "GET",
        params: {
          from,
          to,
          logId,
        },
      }),
    }),
  }),
});

export const {
  useGetAllTracesQuery,
  useGetTraceByIdQuery,
  useGetTraceWithAttributesQuery,
  useGetTraceWithMostEventsQuery,
  useGetTraceWithLeastEventsQuery,
  useGetTracesWithMinimumEventsQuery,
  useGetTracesWithMaximumEventsQuery,
  useGetEventsForTraceQuery,
  useGetConceptNameForTraceQuery,
  useGetTracesByConceptNameQuery,
  useGetEventWithMaxSequenceQuery,
  useGetTracesByTimestampQuery,
  useGetTracesByTimestampRangeQuery,
} = traceApi;
