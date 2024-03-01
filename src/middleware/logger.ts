import { Request as ExpressRequest } from 'express';
import { Response, NextFunction } from 'express';
import fs from 'fs';
import pathModule from 'path';

interface CustomRequest extends ExpressRequest {
  user?: any;
}

const logger = (req: CustomRequest, res: Response, next: NextFunction) => {
  const { method, path: requestPath, body, user } = req;

  const logData = `[${new Date().toISOString()}] ${method} ${requestPath} ${JSON.stringify(body)} ${JSON.stringify(user || {})}\n`;

  fs.appendFile(pathModule.join(__dirname, '..', '..', 'logs', 'access.log'), logData, (err) => {
    if (err) {
      console.error(err);
    }
  });

  res.on('finish', () => {
    const { statusCode } = res;
    const logData = `[${new Date().toISOString()}] ${method} ${requestPath} ${statusCode}\n`;

    fs.appendFile(pathModule.join(__dirname, '..', '..', 'logs', 'access.log'), logData, (err) => {
      if (err) {
        console.error(err);
      }
    });
  });

  next();
};

export default logger;
