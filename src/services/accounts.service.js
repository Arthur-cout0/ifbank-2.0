import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export const getAccount = async() => {
  const accountsCollection = collection(db, "accounts");

  console.log(accountsCollection)

  let restricoes = [where("userId", "==", auth.currentUser.uid)];
  const q = query(accountsCollection, ...restricoes);
  console.log(q)
  const account = await getDocs(q);

  console.log(account)

  const dadosDaConta = account.data()

  return {
    userId: account.userId,
    balance: dadosDaConta.balance,
    history: dadosDaConta.history,
  }
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

export const updateAccount = (id, balance, history) => {
  updateDoc(doc(db, "accounts", id), {
    balance: balance,
    history: history,
  });
}