interface IUserQueryInput {
  q?: string;
  page?: number;
  limit?: number;
  sort?: string;
  fields?: string[];
}

interface IUser {
  id: string;
  email: string;
  firstname?: string;
  lastname?: string;
  birthday?: Date;
  level?: string;
  points?: number;
  reputation?: number;
  services?: IUserService;
  role?: string;
  picture?: string;
  phone?: string;
  banned?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IUserRegistrationRequest {
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
}

interface IUserUpdateRequest {
  firstname?: string;
  lastname?: string;
  picture?: string;
  banned?: boolean;
  phone?: string;
}

interface IUserService {
  facebook?: string,
  github?: string,
  google?: string
}
