interface IToken {
  access_token: string;
}

interface IAuth {
  token: string;
  user: IUser;
}
