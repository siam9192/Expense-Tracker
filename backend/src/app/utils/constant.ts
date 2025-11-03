import { UserRole } from "../modules/user/user.interface";

export const PAGINATION_OPTION_KEYS = ["page", "limit", "sortBy", "sortOrder"];

export const ALL_ROLES = Object.values(UserRole) as UserRole[];

export const GLOBAL_ERROR_MESSAGE =
  "Oops! There is something happened wrong.Please try again later";

export const FAST_FOREX_EXCHANGE_RATE_API =
  "https://api.fastforex.io/fetch-one?from=USD&to=EUR";

export const DEFAULT_AVATARS = [
  {
    name: "Man Avatar",
    src: "https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4866.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    name: "Woman Avatar",
    src: "https://img.freepik.com/premium-vector/woman-avatar-profile-picture-isolated-background-avatar-profile-picture-woman_1293239-4867.jpg?w=740",
  },
  {
    name: "Businessman Avatar",
    src: "https://img.freepik.com/premium-vector/businessman-avatar-profile-picture_1293239-4845.jpg?w=740",
  },
  {
    name: "Girl Avatar",
    src: "https://img.freepik.com/premium-vector/girl-avatar-profile-picture_1293239-4846.jpg?w=740",
  },
  {
    name: "Young Man Avatar",
    src: "https://img.freepik.com/premium-vector/young-man-avatar-profile-picture_1293239-4859.jpg?w=740",
  },
  {
    name: "Female Avatar",
    src: "https://img.freepik.com/premium-vector/female-avatar-profile-picture_1293239-4860.jpg?w=740",
  },
  {
    name: "Teen Boy Avatar",
    src: "https://img.freepik.com/premium-vector/teen-boy-avatar-profile-picture_1293239-4861.jpg?w=740",
  },
  {
    name: "Teen Girl Avatar",
    src: "https://img.freepik.com/premium-vector/teen-girl-avatar-profile-picture_1293239-4862.jpg?w=740",
  },
  {
    name: "Old Man Avatar",
    src: "https://img.freepik.com/premium-vector/old-man-avatar-profile-picture_1293239-4863.jpg?w=740",
  },
  {
    name: "Old Woman Avatar",
    src: "https://img.freepik.com/premium-vector/old-woman-avatar-profile-picture_1293239-4864.jpg?w=740",
  },
];

export const DEFAULT_PROFESSIONS = [
  "Software Engineer",
  "Web Developer",
  "Mobile App Developer",
  "Data Scientist",
  "UX/UI Designer",
  "Product Manager",
  "Project Manager",
  "Graphic Designer",
  "Digital Marketer",
  "Content Writer",
  "Copywriter",
  "SEO Specialist",
  "Social Media Manager",
  "Accountant",
  "Financial Analyst",
  "HR Manager",
  "Teacher",
  "Professor",
  "Doctor",
  "Nurse",
  "Lawyer",
  "Civil Engineer",
  "Mechanical Engineer",
  "Electrical Engineer",
  "Architect",
  "Consultant",
  "Entrepreneur",
  "Photographer",
  "Videographer",
  "Animator",
  "Musician",
  "Artist",
  "Athlete",
  "Pilot",
  "Journalist",
  "Translator",
  "Librarian",
];
