import express, { Request, Response } from "express";
// import moongose from "moongose";
import requestIP from "request-ip";
import { lookup } from "geoip-lite";
import phoneLineModel from "../model/phoneNumberModel";

type Telco = "MTN" | "GLO" | "Airtel" | "Etisalat" | "NTEL" | "SMILE";
type PhoneNumber = string;

const mtnPrefix = [
  "0806",
  "0803",
  "0903",
  "0810",
  "0703",
  "0814",
  "0813",
  "0816",
  "0906",
  "0913",
  "0706",
];
const gloPrefix = ["0805", "0807", "0705", "0815", "0811", "0905"];
const airtelPrefix = ["0802", "0808", "0708", "0812", "0701", "0902"];
const etisalatPrefix = ["0809", "0818", "0817", "0909"];
const ntelPrefix = ["0804"];
const smilePrefix = ["0702"];

/**
 * "Given a phone number, return the first four digits of the phone number."
 *
 * The function takes a phone number as an argument and returns a string
 * @param {PhoneNumber} phoneNumber - The phone number to get the prefix from.
 * @returns The first 4 characters of the phone number.
 */

const getPhoneNumberPrefix = (phoneNumber: PhoneNumber): string => {
  return phoneNumber.substring(0, 4);
};

/**
 * "Given a list of prefixes and a phone number, return true if the phone number has one of the
 * prefixes."
 *
 * The function is written in TypeScript, which is a superset of JavaScript. TypeScript is a typed
 * language, which means that it has types. In the above function, the prefixes parameter is of type
 * string[] and the phoneNumber parameter is of type string
 * @param {string[]} prefixes - An array of strings that represent the prefixes you want to check for.
 * @param {string} phoneNumber - The phone number to check
 * @returns A boolean value.
 */

const phoneNumberHasPrefix = (prefixes: string[], phoneNumber: string) => {
  if (prefixes.includes(getPhoneNumberPrefix(phoneNumber))) {
    return true;
  }
  return false;
};

/**
 * Given a phone number, return true if the phone number has the MTN prefix.
 * @param {PhoneNumber} phoneNumber - PhoneNumber - This is the phone number we want to check if it's
 * an MTN line.
 * @returns A boolean
 */
const isMtnLine = (phoneNumber: PhoneNumber): boolean => {
  return phoneNumberHasPrefix(mtnPrefix, phoneNumber);
};
const isGloLine = (phoneNumber: PhoneNumber): boolean => {
  return phoneNumberHasPrefix(gloPrefix, phoneNumber);
};
const isAirtelLine = (phoneNumber: PhoneNumber): boolean => {
  return phoneNumberHasPrefix(airtelPrefix, phoneNumber);
};

/**
 * Given a phone number, return true if the phone number has the prefix of ntel.
 * @param {PhoneNumber} phoneNumber - PhoneNumber - This is the phone number we want to check.
 * @returns A boolean
 */
const isNtel = (phoneNumber: PhoneNumber): boolean => {
  return phoneNumberHasPrefix(ntelPrefix, phoneNumber);
};
const isEtisalat = (phoneNumber: PhoneNumber): boolean => {
  return phoneNumberHasPrefix(etisalatPrefix, phoneNumber);
};
const isSmile = (phoneNumber: PhoneNumber): boolean => {
  return phoneNumberHasPrefix(smilePrefix, phoneNumber);
};

/**
 * It takes a phone number as input and returns the telco of the phone number
 * @param {Request} req - Request - this is the request object that contains the request data.
 * @param {Response} res - This is the response object. It is used to send a response to the client.
 * @returns the telco of the phone number provided.
 */

export const getTelcoController = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;
    const ip: any = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log("ip", ip);
    const location = lookup(ip);
    console.log("location", location?.country);

    const nums = phoneNumber.match(/\d/g);
    if (phoneNumber.length !== nums.length) {
      return res.status(400).json({ msg: "inputs can only be numbers" });
    }
    if (!phoneNumber) {
      return res.status(400).json({ error: "please provide a phone number" });
    }
    const length = phoneNumber.length;
    if (length !== 11 || (phoneNumber.startsWith("+234") && length !== 14)) {
      return res
        .status(400)
        .json({ error: "please provide a valid Nigeria phone number" });
    }
    const telco = detectTelco(phoneNumber);
    if (telco == undefined) {
      return res.status(400).json({
        error: "please check that you are providing a Nigeria phoneNumber ",
      });
    }
    const phoneValidated = await new phoneLineModel({
      phoneNumber,
      location: location,
    });
    phoneValidated.save();
    return res.status(200).json({ telco });
  } catch (error: any) {
    res.send(error.message);
    console.log("error", error);
  }
};

/**
 * It returns the telco of a phone number if it's a valid Nigerian phone number, otherwise it returns
 * undefined
 * @param {PhoneNumber} phoneNumber - This is the phone number you want to check.
 * @returns A function
 */

const detectTelco = (phoneNumber: PhoneNumber): Telco | undefined => {
  if (isMtnLine(phoneNumber)) {
    return "MTN";
  }
  if (isGloLine(phoneNumber)) {
    return "GLO";
  }
  if (isAirtelLine(phoneNumber)) {
    return "Airtel";
  }
  if (isEtisalat(phoneNumber)) {
    return "Etisalat";
  }
  if (isSmile(phoneNumber)) {
    return "SMILE";
  }
  if (isNtel(phoneNumber)) {
    return "NTEL";
  }
};
