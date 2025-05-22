import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/" }),
  endpoints: (builder) => ({
    getAllEvents: builder.query({
      query: () => ({
        url: "events",
        method: "GET",
      }),
    }),

    getEventAttributes: builder.query({
      query: (eventId) => ({
        url: `events/${eventId}/attributes`,
        method: "GET",
      }),
    }),

    getConceptNameForEvent: builder.query({
      query: (eventId) => ({
        url: `events/${eventId}/conceptName`,
        method: "GET",
      }),
    }),

    getEventsByConceptName: builder.query({
      query: (conceptName) => ({
        url: `events/hasConceptName?conceptName=${conceptName}`,
        method: "GET",
      }),
    }),

    getTimeStampForEvent: builder.query({
      query: (eventId) => ({
        url: `events/${eventId}/timeStamp`,
        method: "GET",
      }),
    }),

    getEventsByTimestamp: builder.query({
      query: (timestamp) => ({
        url: `events/time?timestamp=${timestamp}`,
        method: "GET",
      }),
    }),

    getEventsByTimestampRange: builder.query({
      query: ({ from, to, traceId }) => ({
        url: "events/timeRange",
        method: "GET",
        params: {
          from,
          to,
          traceId,
        },
      }),
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetEventAttributesQuery,
  useGetConceptNameForEventQuery,
  useGetEventsByConceptNameQuery,
  useGetTimeStampForEventQuery,
  useGetEventsByTimestampQuery,
  useGetEventsByTimestampRangeQuery,
} = eventApi;
