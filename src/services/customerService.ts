import api from "./api";
import { CustomerDTO } from "../types/Customer";

export const getAllCustomers = async () => {
  const response = await api.get<CustomerDTO[]>("/customers");
  return response.data;
};

export const getCustomerById = async (id: number) => {
  const response = await api.get<CustomerDTO>(`/customers/${id}`);
  return response.data;
};

export const createCustomer = async (customer: Omit<CustomerDTO, "id">) => {
  const response = await api.post<CustomerDTO>("/customers", customer);
  return response.data;
};
