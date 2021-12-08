export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  age: number;
  birthDate: Date | string;
  gender: string;
  maritalStatus: string;
  rfc: string;
  address: string;
  email: string;
  phone: string;
  position: string;
  creatAt: Date;
  updateAt: Date;
  deleteAt: Date;
  fullName?: string;
}
