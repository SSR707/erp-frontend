import { IImages } from "./getDashboard.interface";
import { IGroup } from "./getStudent.interface";

export interface IGetTeachersInterface {
  status: number;
  message: string;
  data: ITeacher[];
  meta: IMeta;
}

export interface ITeacher {
  full_name: string;
  username: string;
  password: string;
  role: string;
  address: string;
  phone_number: string;
  gender: string;
  data_of_birth: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  images: IImages[];
  groups: IGroup[];
  PaymentForTeacher: IPaymentForTeacher[];
}

export interface IMeta {
  teacherCount: number;
}

export interface IPaymentForTeacher {
  type: string;
  sum: number;
  created_at: string;
}
