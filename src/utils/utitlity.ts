async function getServerCookie(cname: string) {
  const lib = import("next/headers");
  const { cookies } = await lib;
  const cookieStore = cookies();
  if (cookieStore.has(cname)) {
    const cookie = cookieStore.get(cname)?.value ?? null;
    return cookie;
  }
  return null;
}

function getClientCookie(cname: string): string | null {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

const getUSDCurrency = (value: number) => {
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
  return currency;
};

const parseFloatWithFixedDecimal = function (number: string | number) {
  number = Number(number);
  if (!Number.isNaN(number)) return Math.round((number + Number.EPSILON) * 100) / 100;
  else return 0;
};

const formatMobileNumber = (e: any) => {
  const input = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
  const formattedInput = input.replace(/(\d{3})(\d{3})(\d{4})/, "($1)-$2-$3");
  e.target.value = formattedInput;
};

const getFileExtension = (file: File) => {
  const fileExtension = `.${file.name.split(".").pop()}`;
  return fileExtension;
};

export {
  getClientCookie,
  getServerCookie,
  getUSDCurrency,
  parseFloatWithFixedDecimal,
  formatMobileNumber,
  getFileExtension,
};
