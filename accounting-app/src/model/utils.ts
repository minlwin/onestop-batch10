import { BalanceType } from "./domains/types";

export const getEntryEditTitle = (id?:string, type?: BalanceType) => type ? (id !== 'create'  ? `Edit ` : 'Create ') + type : 'Edit Ledger Entry'