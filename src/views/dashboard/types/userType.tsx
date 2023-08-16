export interface UserType {
  UserData: IUserType
}

export type IUserType = {
  id: string,
  username: string,
  firstname: string,
  lastname: string,
  physicaladdress: string,
  city: string,
  state: string,
  zip: number,
  roleId: number,
  mobilenumber: number,
  email: string,
  designation: string,
  password: string
}