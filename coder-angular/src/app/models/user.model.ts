


export class User{
  // id?: number;
  // user_name?: string;
  // auth_token?: string;

  constructor(public  id, public  user_name, public  auth_token){
  }

  isAuthenticated(){
    if (this.auth_token){
      return  true;
    }
    else{
      return  false;
    }
  }
}



