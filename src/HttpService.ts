// class HttpService{
//   constructor(){
//       this.authToken = cookies.auth;
//       this.refresh = cookies.refresh;
//       this.validateToken()
//   }

//   autoRefreshToken(){

//   }

//   validateToken(){
//       this.expired = False
//       if(this.expired){
//           autoRefreshToken()
//       }
//   }

//   post(url,payload){
//       return new Promise((resolve,reject)=>{
//           if(this.expired){
//               return reject('Session expired')
//           }
//           // call api 
//       })
//   }
// }