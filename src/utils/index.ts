export const tempToPercent = (temp: number) => {
  const t = temp + 10;

  if (t === 0) {
    return 0;
  }

  return 100 / (40 / t);
};
