import { MenuModel } from "./models";

export const menuOptions: MenuModel[] = [
  {
    id: 1,
    description: "Início",
    route: "/internal/main",
    icon: "menu",
    active: false,
  },
  {
    id: 2,
    description: "Acessos",
    route: "/internal/accesses",
    icon: "menu",
    active: false,
  },
  {
    id: 3,
    description: "Visualizar câmeras",
    route: "/internal/cams",
    icon: "menu",
    active: false,
  },
]
