export type MeepleEvent = {
  timestamp: number;
  action: string;
  state: string;
};

export type Journal = MeepleEvent[];
