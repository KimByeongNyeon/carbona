import {
  Home,
  Pencil,
  Settings,
  Target,
  Upload,
} from "lucide-react";

type NavigationItem = {
  label: string;
  href: string;
  icon: typeof Home;
};

type NavigationGroup = {
  title: string;
  items: NavigationItem[];
};

export const navigationGroups: NavigationGroup[] = [
  {
    title: "",
    items: [
      { label: "대시보드", href: "/dashboard", icon: Home },
      { label: "데이터 입력", href: "/activities", icon: Pencil },
      { label: "엑셀 가져오기", href: "/excel", icon: Upload },
      { label: "배출계수 관리", href: "/emission-factors", icon: Settings },
      { label: "목표 관리", href: "/targets", icon: Target },
    ],
  },
];
