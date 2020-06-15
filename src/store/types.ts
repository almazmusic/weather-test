export type Loading = 'idle' | 'pending' | 'success' | 'error';

export type Error = string | null;

export type Option = {
  value: string | number;
  label: string;
};
