import { pool } from '../models/pool';
import {
  insertMessages,
  dropMessagesTable,
  createMessageTable,
  deleteMessagesTable,
  insertClientFinance,
  dropClientFinanceTable,
  createClientFinanceTable,
  deleteClientFinanceTable
} from './queries';

export const executeQueryArray = async arr => new Promise(resolve => {
  const stop = arr.length;
  arr.forEach(async (q, index) => {
    await pool.query(q);
    if (index + 1 === stop) resolve();
  });
});

export const dropTables = () => executeQueryArray([ dropMessagesTable ]);
export const createTables = () => executeQueryArray([ createMessageTable ]);
export const insertIntoTables = () => executeQueryArray([ insertMessages ]);
export const deleteFromTables = () => executeQueryArray([ deleteMessagesTable ]);
export const dropTables2 = () => executeQueryArray([ dropClientFinanceTable ]);
export const createTables2 = () => executeQueryArray([ createClientFinanceTable ]);
export const insertIntoTables2 = () => executeQueryArray([ insertClientFinance ]);
export const deleteFromTables2 = () => executeQueryArray([ deleteClientFinanceTable ]);