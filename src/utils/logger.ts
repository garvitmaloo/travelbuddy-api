import winston, { format } from "winston";

const { colorize, printf, timestamp } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    colorize(),
    timestamp({
      format: "DD/MM/YYYY hh:mm A"
    }),
    customFormat
  ),
  transports: [new winston.transports.Console()]
});
