import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { getToday } from "../util/getToday";

export const getAccount = async () => {
  const accountsCollection = collection(db, "accounts");

  let restricoes = [where("userId", "==", auth.currentUser.uid)];
  const q = query(accountsCollection, ...restricoes);
  const accounts = await getDocs(q);

  const accountList = []

  accounts.forEach((account) => {
    const accountData = account.data()
    accountList.push(accountData)
  })

  return accountList[0]
}

export const createAccount = (uid) => {
  const accountsCollection = collection(db, "accounts");
  console.log('conta criada')
  addDoc(accountsCollection, {
    balance: 0,
    history: [],
    userId: uid
  });
}

export const updateAccount = async (id, balance, history) => {

  const accountsCollection = collection(db, "accounts");

  let restricoes = [where("userId", "==", auth.currentUser.uid)];
  const q = query(accountsCollection, ...restricoes);
  const accounts = await getDocs(q);

  const accountArray = []

  accounts.forEach((account) => {
    accountArray.push(account)
  }) 

  console.log(accountArray[0])

  const accountRef = await doc(db, "accounts", accountArray[0].id)

  console.log('atualizou')

  updateDoc(accountRef, {
    balance: balance,
    history: history,
  });
}

const createTransaction = (type, value) => {
  return {
    type: type,
    value: value,
    date: getToday(),
  }
}

export const accountDeposit = async (value) => {

  const account = await getAccount()

  console.log('depositou')

  updateAccount(auth.currentUser.uid, account.balance + value, [...account.history, createTransaction('deposit', value)])
}

export const accountWithdraw = async (value) => {

  const account = await getAccount()

  console.log('sacou')

  updateAccount(auth.currentUser.uid, account.balance - value, account.history)
}