export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  dateOfBirth: string;
  gender: string;
  role: string;
}
  
export interface Gender{
  value: string;
  viewValue: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface LoggedInUser {
  fullname: string;
  username: string;
}