import AesUtil from "./AESUtil";
import { lib } from "crypto-js";
import { enc } from "crypto-js";

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
