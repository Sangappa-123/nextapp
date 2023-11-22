import { cookies } from "next/headers";

function getServerCookie(cname: string): string | null {
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

export { getClientCookie, getServerCookie };
