
export enum PizzaType {
  VEG = 'VEG',
  NON_VEG = 'NON_VEG',
  DELUXE_VEG = 'DELUXE_VEG',
  DELUXE_NON_VEG = 'DELUXE_NON_VEG'
}

export interface PizzaConfig {
  type: PizzaType;
  basePrice: number;
  hasExtraCheese: boolean;
  hasExtraToppings: boolean;
  isTakeaway: boolean;
}

export const PIZZA_PRICES = {
  [PizzaType.VEG]: 300,
  [PizzaType.NON_VEG]: 400,
  [PizzaType.DELUXE_VEG]: 550,
  [PizzaType.DELUXE_NON_VEG]: 650,
};

export const ADDON_PRICES = {
  CHEESE: 100,
  TOPPINGS: 150,
  TAKEAWAY: 20,
};
