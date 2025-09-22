import {
  Mail,
  Calendar,
  Kanban,
  ReceiptText,
  Users,
  Lock,
  Fingerprint,
  SquareArrowUpRight,
  LayoutDashboard,
  ChartBar,
  Banknote,
  Gauge,
  Construction,
  Settings,
  UserCog,
  Wallet,
  Clock,
} from "lucide-react";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Main",
    items: [
      {
        title: "Dashboard Overview",
        url: "/dashboard/default",
        icon: LayoutDashboard,
        subItems: [
          {
            title: "Today's Summary",
            url: "/dashboard/default",
            icon: ChartBar,
          },
          {title:"Notifications",
            url: "/dashboard/notifications",
            icon: Mail,
          },
        ],
      },
      // {
      //   title: "Notifications",
      //   url: "/dashboard/notifications",
      //   icon: Mail,
      // },
      {
        title: "Bookings",
        url: "/dashboard/bookings",
        icon: Calendar,
        subItems: [
          {
            title: "All Bookings",
            url: "/dashboard/bookings",
            icon: Calendar,
          },
          {
            title: "Calendar View",
            url: "/dashboard/bookings/calendar",
            icon: Kanban,
          },
          {
            title: "Manual Booking",
            url: "/dashboard/bookings/manual",
            icon: SquareArrowUpRight,
          },
        ],
      },
      {
        title: "Schedule",
        url: "/dashboard/schedule",
        icon: Clock,
        subItems: [
          {
            title: "Upcoming Schedules",
            url: "/dashboard/schedule/upcoming",
            icon: Clock,
          },
          {
            title: "Past Schedules",
            url: "/dashboard/schedule/past",
            icon: Clock,
          },
          {
            title: "Create Schedule",
            url: "/dashboard/schedule/create",
            icon: SquareArrowUpRight,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Management",
    items: [
      {
        title: "Fields",
        url: "/dashboard/fields",
        icon: Construction,
        subItems: [
          {
            title: "Football Fields",
            url: "/dashboard/fields/football",
            icon: SquareArrowUpRight,
          },
          {
            title: "Cricket Fields",
            url: "/dashboard/fields/cricket",
            icon: SquareArrowUpRight,
          },
          {
            title: "Add New Field",
            url: "/dashboard/fields/add",
            icon: SquareArrowUpRight,
          },
        ],
      },
      {
        title: "People",
        url: "/dashboard/people",
        icon: Users,
        subItems: [
          {
            title: "Customers",
            url: "/dashboard/people/customers",
            icon: Users,
          },
          {
            title: "Employees",
            url: "/dashboard/people/employees",
            icon: UserCog,
          },
          {
            title: "Staff Shifts",
            url: "/dashboard/people/shifts",
            icon: Calendar,
          },
        ],
      },
      {
        title: "Finance",
        url: "/dashboard/finance",
        icon: Banknote,
        subItems: [
          {
            title: "Add Expenses",
            url: "/dashboard/finance/add-expenses",
            icon: ReceiptText,
          },
          {
            title: "Expense Tracker",
            url: "/dashboard/finance/expenses",
            icon: ChartBar,
          },
          {
            title: "Transactions",
            url: "/dashboard/finance/transactions",
            icon: Wallet,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Analytics",
    items: [
      {
        title: "Reports",
        url: "/dashboard/analytics",
        icon: Gauge,
        subItems: [
          {
            title: "Daily Reports",
            url: "/dashboard/analytics/daily",
            icon: ChartBar,
          },
          {
            title: "Weekly Reports",
            url: "/dashboard/analytics/weekly",
            icon: ChartBar,
          },
          {
            title: "Monthly Reports",
            url: "/dashboard/analytics/monthly",
            icon: ChartBar,
          },
          {
            title: "Profit vs Expenses",
            url: "/dashboard/analytics/profit-expenses",
            icon: ChartBar,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    label: "Settings",
    items: [
      {
        title: "System Settings",
        url: "/dashboard/settings",
        icon: Settings,
        subItems: [
          {
            title: "Turf Profile",
            url: "/dashboard/settings/profile",
            icon: Construction,
          },
          {
            title: "Payment Methods",
            url: "/dashboard/settings/payment-methods",
            icon: Wallet,
          },
          {
            title: "User Roles",
            url: "/dashboard/settings/roles",
            icon: Lock,
          },
          {
            title: "Permissions",
            url: "/dashboard/settings/permissions",
            icon: Fingerprint,
          },
        ],
      },
    ],
  },
];
