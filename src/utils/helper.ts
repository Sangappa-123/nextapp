import AesUtil from "./AESUtil";
import { lib, enc } from "crypto-js";

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
