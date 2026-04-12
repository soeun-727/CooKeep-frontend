let loadingTimer: ReturnType<typeof setTimeout> | null = null;
let loadingCount = 0;

export const startLoading = (setLoading: (v: boolean) => void) => {
  loadingCount++;

  if (loadingCount === 1) {
    loadingTimer = setTimeout(() => {
      setLoading(true);
    }, 180);
  }
};

export const stopLoading = (setLoading: (v: boolean) => void) => {
  loadingCount--;

  if (loadingCount <= 0) {
    loadingCount = 0;

    if (loadingTimer) {
      clearTimeout(loadingTimer);
      loadingTimer = null;
    }

    setLoading(false);
  }
};
