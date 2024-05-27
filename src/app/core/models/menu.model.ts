export interface MenuModel {
  id: number;
  description: string;
  icon: string;
  route: string;
  active?: boolean;
  options?: MenuModel[];
}

