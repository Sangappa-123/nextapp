class HttpService {
  expired: any
  constructor() {
    // this.authToken = token; // fetch token from store/localstorage/cookies
    this.validateToken()
  }

  // function to validate the tocken
  validateToken() {
    // this.expired = false;
  }

  post(url:string, payload:{}) {
    return new Promise((resolve, reject) => {
      if (this.expired) {
        return reject('Session expired')
      }
      // call api
      return resolve;
    })
  }

  get(url:string){
      return new Promise((resolve, reject) => {
        if (this.expired) {
          return reject('Session expired')
        }
        // call api 
        return resolve;
      })
    }
}

export default HttpService;