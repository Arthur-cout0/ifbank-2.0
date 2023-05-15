import { createContext, useEffect, useState } from "react";
import { getAccount } from "../../services/accounts.service";

export const AccountContext = createContext({})

export function AccountProvider({children}){
    const [account, setAccount] = useState({})

    async function settingAccount(){
        await getAccount().then((account) => {setAccount(account)})
        
    }

    useEffect(() => {
        settingAccount()
    }, [])

    return <AccountContext.Provider value={{account, setAccount, settingAccount}}>
        {children}
    </AccountContext.Provider>
}
