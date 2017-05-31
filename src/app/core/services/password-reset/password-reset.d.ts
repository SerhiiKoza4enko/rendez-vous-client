interface IPasswordResetQueryInput {
  email?: string;
  link?: string;
}

interface IPasswordReset {
  token?: string;
  user: Object;
}
