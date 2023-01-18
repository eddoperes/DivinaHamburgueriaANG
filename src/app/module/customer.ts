import { Address } from "./address";
import { Phone } from "./phone";

export interface Customer {
    id : number,
    name : string,  
    cpf : string,
    address: Address,
    phone: Phone,
}