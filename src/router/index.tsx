import { lazy } from "react";
const AuthLogin = lazy(() => import("@/pages/auth/auth-login"));
const AdminLayout = lazy(() => import("@/pages/Admin/layout/AdminLayout"));
import RoleChecker from "@/components/RoleChecker/RoleChecker";
import { IRoutes } from "@/utils/index";
import Dashboard from "@/pages/Admin/dashboard/dashboard";
import Students from "@/pages/Admin/students/students";
import Teachers from "@/pages/Admin/teachers/teachers";
import Groups from "@/pages/Admin/groups/groups";
import Settings from "@/pages/Admin/settings/settings";
import StudentCreate from "@/pages/Admin/studetn-create/student-create";
import TeacherCreate from "@/pages/Admin/teacher-create/teacher-create";
import GroupCreate from "@/pages/Admin/group-create/group-create";
import Courses from "@/pages/Admin/courses/course";
import NotFound from "@/pages/notfound/notfound";
import CourseCreate from "@/pages/Admin/course-create/course-create";
import StudentDiteil from "@/pages/Admin/student-diteil/student-diteil";
import TeacherDiteil from "@/pages/Admin/teacher-diteil/teacher-diteil";
import GroupDiteil from "@/pages/Admin/group-diteil/group-diteil";
import CourseDiteil from "@/pages/Admin/course-diteil/course-diteil";

export const routes: IRoutes[] = [
  {
    path: "/login",
    element: <AuthLogin />,
  },
  {
    path: "/",
    element: <RoleChecker roles={["ADMIN"]} />,
    children: {
      index: true,
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/students",
          element: <Students />,
        },
        {
          path: "/teachers",
          element: <Teachers />,
        },
        {
          path: "/groups",
          element: <Groups />,
        },
        {
          path: "/courses",
          element: <Courses />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/student/create",
          element: <StudentCreate />,
        },
        {
          path: "/teacher/create",
          element: <TeacherCreate />,
        },
        {
          path: "/group/create",
          element: <GroupCreate />,
        },
        {
          path: "/course/create",
          element: <CourseCreate />,
        },
        {
          path: "/student/:id",
          element: <StudentDiteil />,
        },
        {
          path: "/teacher/:id",
          element: <TeacherDiteil />,
        },
        {
          path: "/group/:id",
          element: <GroupDiteil />,
        },
        {
          path: "/course/:id",
          element: <CourseDiteil />,
        },
        {
          path: "/*",
          element: <NotFound />,
        },
      ],
    },
  },
  {
    path: "/",
    element: <RoleChecker roles={["TEACHER"]} />,
    children: {
      index: true,
      element: <></>,
    },
  },
];
