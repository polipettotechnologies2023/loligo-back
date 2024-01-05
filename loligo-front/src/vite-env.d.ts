/// <reference types="vite/client" />

import { RootState as BaseRootState } from 'react-redux';

// Extend the RootState type with your specific slices
interface RootState extends BaseRootState {
  token: {
    value: string; // Adjust the type accordingly
  };
}