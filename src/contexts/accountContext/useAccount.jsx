import { useContext } from "react";
import { AccountContext } from ".";

export function useAccount(){
    return useContext(AccountContext)
}