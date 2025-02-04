const DEFAULT_MAX_LENGTH = 20;

export const truncateString = (value = '', maxLength = DEFAULT_MAX_LENGTH) =>
  value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
