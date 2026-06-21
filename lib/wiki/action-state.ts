export interface WikiActionState {
  status: 'idle' | 'success' | 'error';
  message: string;
  fieldErrors?: Record<string, string[]>;
}

export const initialWikiActionState: WikiActionState = {
  status: 'idle',
  message: '',
};
