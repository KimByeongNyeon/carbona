import {
  BarChart3,
  FileBarChart,
  Home,
  Pencil,
  Settings,
  Target,
  Upload,
  UserRound,
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
  {
    title: "보고 및 분석",
    items: [
      { label: "보고서", href: "/reports", icon: FileBarChart },
      { label: "통계 분석", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "설정",
    items: [
      { label: "사용자 관리", href: "/users", icon: UserRound },
      { label: "시스템 설정", href: "/settings", icon: Settings },
    ],
  },
];
