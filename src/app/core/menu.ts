import { MenuModel } from "./models";

export const menuOptions: MenuModel[] = [
  {
    id: 1,
    description: "Visão geral",
    route: "/internal/main",
    icon: "menu",
    active: false,
  },
  {
    id: 3,
    description: "Acessantes",
    route: "/internal/users",
    icon: "menu",
    active: false,
  },
]
