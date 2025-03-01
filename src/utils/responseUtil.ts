import { Response } from "express";

interface ResponseData {
  code: number;
  message: string;
  data?: object;
}

export const send = (res: Response, responseData: ResponseData): Response => {
  const { code, message, data } = responseData;
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, access_token",
    "Access-Control-Allow-Methods": "*",
  });
  return res.send({
    responseCode: code,
    responseMessage: message,
    responseData: data,
  });
};

export const setResponseMsg = (res: ResponseData, parameter?: string, data: object = {}): ResponseData => {
  return {
    code: res.code,
    message: `${parameter ?? ""} ${res.message}`.trim(),
    data: data
  };
};