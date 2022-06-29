export const createMessageTable = `
DROP TABLE IF EXISTS clientdatatable;
CREATE TABLE IF NOT EXISTS clientdatatable (
  id SERIAL PRIMARY KEY,
  Name VARCHAR NOT NULL, 
  Email VARCHAR NOT NULL, 
  Contact NUMERIC, 
  Age NUMERIC NOT NULL, 
  Married VARCHAR NOT NULL, 
  Children VARCHAR NOT NULL, 
  Dependent VARCHAR NOT NULL, 
  Income NUMERIC NOT NULL,
  Expenditure NUMERIC NOT NULL, 
  EMI NUMERIC, 
  EquityAdditions NUMERIC, 
  MFSIP NUMERIC, 
  Crypto NUMERIC, 
  Insurance NUMERIC, 
  Source VARCHAR, 
  EquityPortfolio NUMERIC, 
  MutualPortfolio NUMERIC, 
  CryptoPortfolio NUMERIC, 
  GoldPortfolio NUMERIC, 
  EstatePortfolio NUMERIC, 
  LiquidPortfolio NUMERIC, 
  Saving NUMERIC, 
  FixedDeposit NUMERIC, 
  Alternate NUMERIC, 
  FinancialGoals NUMERIC, 
  RetirementGoal NUMERIC,
  ProfileImage VARCHAR
  )
  `;

export const insertMessages = `
INSERT INTO clientdatatable(Name, Email, Contact, Age, Married, Children, Dependent, Income, Expenditure, EMI, EquityAdditions, MFSIP, Crypto, Insurance, Source, EquityPortfolio, MutualPortfolio, CryptoPortfolio, GoldPortfolio, EstatePortfolio, LiquidPortfolio, Saving, FixedDeposit, Alternate, FinancialGoals, RetirementGoal)
VALUES ('ABC','abc@yahoo.com',0,20,'No','0','No',1,2,0,0,0,0,0,'',0,0,0,0,0,0,0,0,0,0,0,'')
`;

export const dropMessagesTable = 'DROP TABLE clientdatatable';

export const deleteMessagesTable = 'DELETE * FROM clientdatatable';
