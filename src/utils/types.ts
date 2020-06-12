export interface IActivity {
  id: number;
  userid: number;
  firstname: string;
  lastname: string;
  hrs: number;
  min: number;
  sec: number;
  distance: number;
  type: string;
  title: string;
  desciption: string;
  _created: Date;
}

export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  activities: number;
  followers: number;
  _created: Date;
}
