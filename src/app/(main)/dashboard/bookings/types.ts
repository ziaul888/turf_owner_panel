// Booking related types
export interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  service: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingStats {
  totalBookings: StatItem;
  completedBookings: StatItem;
  pendingBookings: StatItem;
  cancelledBookings: StatItem;
}

export interface StatItem {
  value: string;
  change: string;
  trending: "up" | "down";
}

// Page configuration types
export interface PageAction {
  label: string;
  icon?: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  onClick: () => void;
  disabled?: boolean;
}

export interface PageConfig {
  title: string;
  subtitle?: string;
  actions?: PageAction[];
}
