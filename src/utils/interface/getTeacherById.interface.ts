import { ITeacher } from "./getTeachers.interface";

export interface IGetTeacherByIdInterface {
  status: number;
  message: string;
  data: ITeacher;
}
