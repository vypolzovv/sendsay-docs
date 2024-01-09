import chalk from 'chalk';

const CHALK_COLOR = {
  red: 'red',
  green: 'green',
  yellow: 'yellow',
  white: 'white',
};

chalk.color = true;

const coloredMessage = (color, text) => chalk[color](text);

const COLOR_STATUSES = {
  error: coloredMessage.bind(null, CHALK_COLOR.red),
  warning: coloredMessage.bind(null, CHALK_COLOR.yellow),
  success: coloredMessage.bind(null, CHALK_COLOR.green),
  primary: coloredMessage.bind(null, CHALK_COLOR.white),
};

const logger = (text) => {
  const message = Object.entries(text).reduce((acc, [status, text]) => {
    const coloredText = COLOR_STATUSES[status]?.(text) ?? text;

    return `${acc} ${coloredText}`;
  }, '');

  console.log(message);
};

export default logger;
