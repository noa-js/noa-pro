declare namespace API {
  type SigninData = {
    username: string;
    password: string;
  };

  type SigninResponse = {
    token: string;
  };
}
