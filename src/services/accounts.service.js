import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export const getAccount = async() => {
  const accountsCollection = collection(db, "accounts");

  let restricoes = [where("userId", "==", auth.currentUser.uid)];
  const q = query(accountsCollection, ...restricoes);

  const account = await getDocs(q);

  const dadosDaConta = account.data()

  return {
    userId: account.userId,
    balance: dadosDaConta.balance,
    history: dadosDaConta.history,
  }
}

export const createAccount = () => {
  const accountsCollection = collection(db, "accounts");
  return addDoc(accountsCollection, {
    balance: 0,
    history: [],
    userId: auth.currentUser.uid
  });
}

export const updateAccount = (id, balance, history) => {
  return updateDoc(doc(db, "accounts", id), {
    balance: balance,
    history: history,
  });
}