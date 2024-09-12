export interface ExpensesByCategory {
    salaries: number;
    supplies: number;
    services: number;
  }
  
  export interface Month {
    id: string;
    month: string;
    revenue: number;
    expenses: number;
    nonOperationalExpenses: number;
    operationalExpenses: number;
  }
  
  export interface Day {
    id: string;
    date: string;
    revenue: number;
    expenses: number;
  }
  
  export interface GetKpisResponse {
    id: string;
    _id: string;
    __v: number;
    totalProfit: number;
    totalRevenue: number;
    totalExpenses: number;
    expensesByCategory: ExpensesByCategory;
    monthlyData: Array<Month>;
    dailyData: Array<Day>;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface GetProductsResponse {
    id: string;
    _id: string;
    __v: number;
    price: number;
    expense: number;
    transactions: Array<string>;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface GetTransactionsResponse {
    id: string;
    _id: string;
    __v: number;
    buyer: string;
    amount: number;
    productIds: Array<string>;
    createdAt: string;
    updatedAt: string;
  }

  // /types/authTypes.ts

// Define the credentials type for login and signup requests
export interface UserCredentials {
  username: string;
  password: string;
}

// Define the response type for login and signup
export interface AuthResponse {
  message: string;
  token?: string;  // Optional token, assuming it might not always be returned
  userId?: string;  // User identifier, if needed
}
