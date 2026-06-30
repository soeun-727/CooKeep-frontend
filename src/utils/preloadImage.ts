export const preloadImage = (src: string) => {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.src = src;

    img.onload = () => resolve();
    img.onerror = () => resolve(); //실패해도 그냥 넘어가게
  });
};
