var winston = require("winston");

logger = new winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({filename: "logfile.log"}),
  ],
});

module.exports = {logger};
