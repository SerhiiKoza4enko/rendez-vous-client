interface IBooking {
  id?: number,
  start_time: Date
  end_time: Date,
  title: string,
  periodic: boolean,
  days_of_week: number[] | string,
  period_start: Date,
  period_end: Date,
  period_id: string,
  user: IUser,
  room: string | IRoom
}