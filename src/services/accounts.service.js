import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../firebase/config";

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

  console.log(accounts, accounts[0].data())

  const account = accounts[0]

  const accountRef = await doc(db, "accounts", account.ref)

  console.log('atualizou')

  updateDoc(accountRef, {
    balance: balance,
    history: history,
  });
}