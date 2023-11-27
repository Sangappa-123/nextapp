import AesUtil from "./AESUtil";
import { lib, enc } from "crypto-js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(tz);

export const getCipherEncryptedText = (text: string | lib.WordArray) => {
  const aesUtil = new AesUtil(128, 1000);
  const iv = lib.WordArray.random(128 / 8).toString(enc.Hex);
  const salt = lib.WordArray.random(128 / 8).toString(enc.Hex);
  const passPhrase = lib.WordArray.random(128 / 8).toString(enc.Hex);
  if (text != null || text != "") {
    return (
      iv +
      "::" +
      aesUtil.encrypt(salt, iv, passPhrase, text) +
      "::" +
      salt +
      "::" +
      passPhrase
    );
  }
};

const deleteAllCookies = () => {
  const cookies = document.cookie.split(";");
  cookies.map((cookie) => {
    document.cookie = cookie + "=; expires=" + new Date(0).toUTCString();
  });
};

export const logoutHandler = () => {
  localStorage.clear();
  deleteAllCookies();
};

export const convertToCurrentTimezone = (unixDate, dateFormat = "MM/DD/YYYY h:mm A") => {
  const timeZone = dayjs.tz.guess();
  return dayjs(unixDate).utc("z").local().tz(timeZone).format(dateFormat);
};
