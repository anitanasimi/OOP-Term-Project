import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
const fs = require('fs');

const errorMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "An error has occured";
  const errorMessage = new Date() + " - " + error.status + " - " + error.message + "\n";
  
  fs.appendFile("error.log", errorMessage, (err) => {
    if (err) {
      console.log(err);
    }
  })
  
  console.log(status, message);
};

export default errorMiddleware;