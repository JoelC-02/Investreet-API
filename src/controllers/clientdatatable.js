import Model from '../models/model';

const clientdatatableModel = new Model('clientdatatable');

export const clientPage = async (req, res) => {
  try {
    const data = await clientdatatableModel.select('Name, Email, Contact, Age, Married, Children, Dependent, Income, Expenditure, EMI, EquityAdditions, MFSIP, Crypto, Insurance, Source, EquityPortfolio, MutualPortfolio, CryptoPortfolio, GoldPortfolio, EstatePortfolio, LiquidPortfolio, Saving, FixedDeposit, Alternate, FinancialGoals, RetirementGoal');
    res.send(data.rows);
  } catch (err) {
    res.status(200).json({ clientdatatable: err.stack });
  }
};

export const clientCurrentWorth = async (req, res) => {
  try {
    const data = await clientdatatableModel.selectWhere('Income, Expenditure, EMI, EquityAdditions, MFSIP, Crypto, Insurance, EquityPortfolio, MutualPortfolio, CryptoPortfolio, GoldPortfolio, EstatePortfolio, LiquidPortfolio, Saving, FixedDeposit, Alternate, FinancialGoals, RetirementGoal', req.params.id);
    res.send(data.rows[0]);
  } catch (err) {
    res.status(200).json({ clientdatatable: err.stack });
  }
};

export const clientPersonalProfile = async (req, res) => {
  try {
    const data = await clientdatatableModel.selectWhere('Name, Email, Contact, Age, Married, Children, Dependent, ProfileImage', req.params.id);
    res.send(data.rows[0]);
  } catch (err) {
    res.status(200).json({ clientdatatable: err.stack });
  }
};

export const addClientData = async (req, res) => {
  const cdata = req.body;

  const columns = 'Name, Email, Contact, Age, Married, Children, Dependent, Income, Expenditure, EMI, EquityAdditions, MFSIP, Crypto, Insurance, Source, EquityPortfolio, MutualPortfolio, CryptoPortfolio, GoldPortfolio, EstatePortfolio, LiquidPortfolio, Saving, FixedDeposit, Alternate, FinancialGoals, RetirementGoal, ProfileImage';
  
  const values = `'${cdata.Name}','${cdata.Email}',${cdata.Contact},${cdata.Age},'${cdata.Married}','${cdata.Children}','${cdata.Dependent}',${cdata.Income},${cdata.Expenditure},${cdata.EMI},${cdata.EquityAdditions},${cdata.MFSIP},${cdata.Crypto},${cdata.Insurance},'${cdata.Source}',${cdata.EquityPortfolio},${cdata.MutualPortfolio},${cdata.CryptoPortfolio},${cdata.GoldPortfolio},${cdata.EstatePortfolio},${cdata.LiquidPortfolio},${cdata.Saving},${cdata.FixedDeposit},${cdata.Alternate},${cdata.FinancialGoals},${cdata.RetirementGoal},'${cdata.ProfileImage}'`;
  
  try {
    const data = await clientdatatableModel.insertWithReturn(columns, values);
    res.status(200).json({ clientdatatable: data.rows });
  } catch (err) {
    res.status(200).json({ clientdatatable: err.stack });
  }
};

export const updatePersonalProfile = async (req, res) => {
  const cdata = req.body;

  const columns = `Name='${cdata.Name}', Contact=${cdata.Contact}, Age=${cdata.Age}, ='${cdata.Married}', Children='${cdata.Children}', Dependent='${cdata.Dependent}'`;
  
  try {
    const data = await clientdatatableModel.updateWithReturn(columns, cdata.Email);
    res.status(200).json({ clientdatatable: data.rows });
  } catch (err) {
    res.status(200).json({ clientdatatable: err.stack });
  }
};

export const updateFinanceProfile = async (req, res) => {
  const cdata = req.body;

  const columns = `Income=${cdata.Income}, Expenditure=${cdata.Expenditure}, EMI=${cdata.EMI}, EquityAdditions=${cdata.EquityAdditions}, MFSIP=${cdata.MFSIP}, Crypto=${cdata.Crypto}, Insurance=${cdata.Insurance}, Source='${cdata.Source}', EquityPortfolio=${cdata.EquityPortfolio}, MutualPortfolio=${cdata.MutualPortfolio}, CryptoPortfolio=${cdata.CryptoPortfolio}, GoldPortfolio=${cdata.GoldPortfolio}, EstatePortfolio=${cdata.EstatePortfolio}, LiquidPortfolio=${cdata.LiquidPortfolio}, Saving=${cdata.Saving}, FixedDeposit=${cdata.FixedDeposit}, Alternate=${cdata.Alternate}, FinancialGoals=${cdata.FinancialGoals}, RetirementGoal=${cdata.RetirementGoal}`;
  
  try {
    const data = await clientdatatableModel.updateWithReturn(columns, cdata.Email);
    res.status(200).json({ clientdatatable: data.rows });
  } catch (err) {
    res.status(200).json({ clientdatatable: err.stack });
  }
};

export const updateProfileImage = async (req, res) => {
  const cdata = req.body;

  const columns = `ProfileImage='${cdata.ProfileImage}'`;
  
  try {
    const data = await clientdatatableModel.updateWithReturn(columns, cdata.Email);
    res.status(200).json({ clientdatatable: data.rows });
  } catch (err) {
    res.status(200).json({ clientdatatable: req.body });
  }
};