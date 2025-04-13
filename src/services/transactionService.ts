import api from "./api";
import { TransactionDTO, TransferRequestDTO } from "../types/Transaction";

export const getTransactionsByAccount = async (accountNumber: string) => {
  const response = await api.get<TransactionDTO[]>(
    `/transaction/${accountNumber}`
  );
  return response.data;
};

export const transferMoney = async (transferData: TransferRequestDTO) => {
  const response = await api.post<TransactionDTO>(
    "/transaction/transfer",
    transferData
  );
  return response.data;
};
