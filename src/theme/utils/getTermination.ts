export const getTermination = (count: number, options: string[], hideNumber = false): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  const idx = count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)];

  return hideNumber ? options[idx] : `${count}\u00A0${options[idx]}`;
};
