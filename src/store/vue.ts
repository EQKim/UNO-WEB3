// src/store/vue.ts
// Vue-Redux bridge utilities for using Redux in Vue components
// Lightweight hooks similar to react-redux

import { ref, computed, onMounted, onUnmounted, type Ref, type ComputedRef } from "vue";
import { store, type RootState } from "./store";

/**
 * Vue composable to select data from Redux store
 * Similar to useSelector from react-redux
 * 
 * This version uses a reactive ref that updates when Redux state changes
 */
export function useSelector<T>(
  selector: (state: RootState) => T
): ComputedRef<T> {
  // Create a reactive reference
  const state = ref(selector(store.getState())) as Ref<T>;
  
  // Subscribe to Redux store changes
  const unsubscribe = store.subscribe(() => {
    state.value = selector(store.getState());
  });
  
  // Clean up subscription when component unmounts
  // Note: This relies on the component calling this in setup()
  if (typeof onUnmounted !== 'undefined') {
    onUnmounted(() => {
      unsubscribe();
    });
  }
  
  // Return as computed for compatibility
  return computed(() => state.value);
}


