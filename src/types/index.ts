export interface MenuItem {
  id: string;
  label: string;
  action: () => void;
}

export interface MarketOption {
  id: string;
  label: string;
  value: number;
}

export interface MenuState {
  isOpen: boolean;
  currentView: string | null;
}