import { resolve } from 'path';
import Model from '../models/model';

const clientdatatableModel = new Model('clientdatatable');
const clientfinancetableModel = new Model('clientfinancetable');

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

  const columns = `Name='${cdata.Name}', Contact=${cdata.Contact}, Age=${cdata.Age}, Married='${cdata.Married}', Children='${cdata.Children}', Dependent='${cdata.Dependent}'`;
  
  try {
    const data = await clientdatatableModel.updateWithReturn(columns, cdata.Email);
    res.status(200).json({ clientdatatable: data.rows });
  } catch (err) {
    res.status(200).json({ clientdatatable: req.body });
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

const fs = require("fs");
const PDFParser = require("pdf2json");

export const uploadClientHoldings = async (req, res) => {
    let pdfParser = new PDFParser(this, 1);
    try {
      pdfParser.loadPDF(`uploads/${req.body.email}.pdf`);
      let pdftext = await new Promise(async (resolve, reject) => {
          pdfParser.on("pdfParser_dataReady", (pdfData) => {
              const raw = pdfParser.getRawTextContent().replace(/\r\n/g, " ");
              resolve({
                  equity: /Equity\s(.*?)EQUITY Total/i.exec(raw)[1].trim(),
                  debt: /Debt\s(.*?)DEBT Total/i.exec(raw)[1].trim(),
                  cash: /Cash\s(.*?)CASH Total/i.exec(raw)[1].trim()
              });
          });
      });
      // var regexp = /[A-Z]+[^\.]*[0-9\/]\.[0-9]{4}[0-9]{2}-[A-Za-z]{3}-22[0-9]+\.[0-9,]+\.[0-9]{2}/g;
      var regexp = /[A-Za-z]+[^.]*\s[A-Za-z]+/g;
      var equityname = pdftext.equity.match(regexp), debtname = pdftext.debt.match(regexp), cashname = pdftext.cash.match(regexp);
      regexp = /-22[0-9]+\.[0-9]{4}/g;
      var equitynav = pdftext.equity.match(regexp), debtnav = pdftext.debt.match(regexp), cashnav = pdftext.cash.match(regexp);
      regexp = /\.[0-9]{4}[0-9,]+\.[0-9]{2}/g;
      var equityval = pdftext.equity.match(regexp), debtval = pdftext.debt.match(regexp), cashval = pdftext.cash.match(regexp);
      for (let i = 0; i < equityname.length; i++) {
          equityname[i] = equityname[i].replace('\'', '');
          equityval[i] = ((equityval[i]+' ').slice(5)).replace(',', '');
          equitynav[i] = (equitynav[i]+' ').slice(3);
          equitynav[i] = ((equityval[i]-'0') / (equitynav[i]-'0')).toFixed(4);
      }
      for (let i = 0; i < debtname.length; i++) {
          debtname[i] = debtname[i].replace('\'', '');
          debtval[i] = ((debtval[i]+' ').slice(5)).replace(',', '');
          debtnav[i] = (debtnav[i]+' ').slice(3);
          debtnav[i] = ((debtval[i]-'0') / (debtnav[i]-'0')).toFixed(4);
      }
      for (let i = 0; i < cashname.length; i++) {
          cashname[i] = cashname[i].replace('\'', ' ');
          cashval[i] = ((cashval[i]+' ').slice(5)).replace(',', '');
          cashnav[i] = (cashnav[i]+' ').slice(3);
          cashnav[i] = ((cashval[i]-'0') / (cashnav[i]-'0')).toFixed(4); 
      }

      const columns = 'Email, Type, FundName, Holding, Value';
      try {
        for (let i = 0; i < equityname.length; i++) {
            await clientfinancetableModel.insertWithReturn(columns, `'${req.body.email}','Equity','${equityname[i]}',${equitynav[i]},${equityval[i]}`);
        }
        for (let i = 0; i < debtname.length; i++) {
            await clientfinancetableModel.insertWithReturn(columns, `'${req.body.email}','Debt','${debtname[i]}',${debtnav[i]},${debtval[i]}`);
        }
        for (let i = 0; i < cashname.length; i++) {
            await clientfinancetableModel.insertWithReturn(columns, `'${req.body.email}','Cash','${cashname[i]}',${cashnav[i]},${cashval[i]}`);
        }
        res.status(200).send("File uploaded successfully");
      } catch (err) {
        res.status(401).send(err.stack);
      }
    } catch(err) {
      res.status(401).send("Upload failed");
    }
};

export const clientHoldings = async (req, res) => {
  try {
    const data = await clientfinancetableModel.selectWhere('Type, FundName, Holding, Value', req.params.id);
    res.send(data.rows);
  } catch (err) {
    res.status(200).json({ clientdatatable: err.stack });
  }
};
