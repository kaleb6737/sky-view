// Import necessary libraries and types
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetKpisResponse, GetProductsResponse, GetTransactionsResponse, AuthResponse, UserCredentials } from './types'; // Adjust path as needed

// Define the API service
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337/api' }), // Base URL includes `/api`
  endpoints: (builder) => ({
    getKpis: builder.query<Array<GetKpisResponse>, void>({
      query: () => '/kpi/kpis',  // Correct path for KPI data
    }),
    getProducts: builder.query<Array<GetProductsResponse>, void>({
      query: () => '/product/products',  // Correct path for product data
    }),
    getTransactions: builder.query<Array<GetTransactionsResponse>, void>({
      query: () => '/transaction/transactions',  // Correct path for transaction data
    }),
    signupUser: builder.mutation<AuthResponse, UserCredentials>({
      query: (credentials) => ({
        url: '/auth/signup',  // Corrected to `/auth/signup`
        method: 'POST',
        body: credentials,
      }),
    }),
    loginUser: builder.mutation<AuthResponse, UserCredentials>({
      query: (credentials) => ({
        url: '/auth/login',  // Corrected to `/auth/login`
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

// Export hooks for all queries and mutations
export const {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
  useSignupUserMutation,
  useLoginUserMutation,
} = api;
