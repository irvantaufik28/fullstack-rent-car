import { Order } from "./constants/enum";
export declare class PageOptionsDto {
    readonly order?: Order;
    readonly page?: number;
    readonly take?: number;
    readonly q?: string;
    get skip(): number;
}
