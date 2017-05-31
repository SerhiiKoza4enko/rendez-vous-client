interface IFeedback {
  id: string;
  mark: number;
  description: string;
  active: boolean;
  checked: boolean;
  user: IUser;
}