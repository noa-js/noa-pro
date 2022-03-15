declare namespace API {
  type LoginData = {
    username: string;
    password: string;
  };

  type LoginResponse = {
    token: string;
  };
}
