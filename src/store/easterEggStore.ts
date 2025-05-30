import create from 'zustand';

interface EasterEggState {
  isDJMode: boolean;
  isRetroMode: boolean;
  toggleDJMode: () => void;
  toggleRetroMode: () => void;
  resetAll: () => void;
}

const useEasterEggStore = create<EasterEggState>((set) => ({
  isDJMode: false,
  isRetroMode: false,

  toggleDJMode: () => set((state) => ({ 
    isDJMode: !state.isDJMode,
  })),

  toggleRetroMode: () => set((state) => ({
    isRetroMode: !state.isRetroMode,
  })),

  resetAll: () => set({
    isDJMode: false,
    isRetroMode: false,
  }),
}));

export { useEasterEggStore }; 