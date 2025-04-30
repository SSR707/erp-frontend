import { IStudetn } from "./getStudent.interface";

export interface IGetStudentByIdInterface {
  status: number;
  message: string;
  data: IStudetn;
}
