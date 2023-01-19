import { Address } from "./address";
import { Phone } from "./phone";

export interface Provider {
    id : number,
    name : string,
    cnpj: string,
    address: Address,
    phone: Phone,    
}