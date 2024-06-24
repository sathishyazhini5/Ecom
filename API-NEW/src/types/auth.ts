export type LoginRequest = {
  mobile_number: string;
  password: string;
};

export type TokenData = {
  userId: number;
  role: string;
};

export type AdminTokenData = {
  id: number;
};
