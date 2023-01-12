import { MenuMenuItem } from "./menuMenuItem";

export interface Menu {
    id : number,
    name : string,
    description : string,
    state : number,
    menuMenuItems: Array<MenuMenuItem>
}