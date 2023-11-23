import { getClientCookie, getServerCookie } from "./utils/utitlity";

class HttpService {
  accessToken: string | undefined | null;
  isClient: boolean;
  isPublic: boolean;
  header: object;
  constructor(isPublic: boolean = false, isClient: boolean = false) {
    this.accessToken = undefined;
    this.isClient = isClient;
    this.isPublic = isPublic;
    this.header = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-originator": process.env.NEXT_PUBLIC_XORIGINATOR,
      "Time-Zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    //  this.validateToken();
  }

  async validateToken() {
    if (!this.isPublic) {
      if (this.isClient) {
        this.accessToken = getClientCookie("accessToken");
      } else {
        const token = await getServerCookie("accessToken");
        this.accessToken = token;
      }
      this.header["X-Auth-Token"] = this.accessToken;
    }
  }

  async post(url: string, payload: unknown, headers?: object) {
    return new Promise((resolve, reject) => {
      this.validateToken().then(() => {
        try {
          fetch(url, {
            method: "POST",
            headers: { ...this.header, ...headers },
            body: JSON.stringify(payload),
          })
            .then((response) => response.json())
            .then((result) => {
              const data = result?.data;
              return resolve({ data });
            })
            .catch((error) => reject({ error }));
        } catch (error) {
          console.error("Post API error", error);
          return reject({ error });
        }
      });
    });
  }
}

export default HttpService;
