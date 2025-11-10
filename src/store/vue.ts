import { onUnmounted, ref, readonly } from "vue";
import type { RootState, AppDispatch } from "./store";
import { store } from "./store";

export function useDispatch(): AppDispatch {
  return store.dispatch as AppDispatch;
}

export function useSelector<T>(selector: (s: RootState) => T) {
  const r = ref<T>(selector(store.getState()));
  const unsub = store.subscribe(() => {
    r.value = selector(store.getState());
  });
  onUnmounted(unsub);
  return readonly(r);
}
