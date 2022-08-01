import express, { Request, Response } from "express";

export const mtn = async (req: Request, res: Response) => {
  res.send("it works");
  console.log("this contoller works");
};
