export interface PricePrefixPair {
    prefix: number;
    price: number;
}

export interface Operator {
    name: string;
    pplist: PricePrefixPair[];
}
