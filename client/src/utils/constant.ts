import type { ResultResponse } from "../types/result.type";

export const sampleResult: ResultResponse = {
  success: true,
  time: "2025-10-24T11:01:15.333Z",
  roll: "778122",
  regulation: "2022",
  exam: "diploma-in-engineering",
  instituteData: {
    code: "63010",
    name: "Habiganj Polytechnic Institute",
    district: " Habiganj",
  },
  resultData: [
    {
      publishedAt: "2024-09-01",
      semester: "3",
      result: {
        failedList: [
          { subjectCode: "25922", subjectName: "Physics-II", failedType: "T" },
          { subjectCode: "25931", subjectName: "Mathematics-III", failedType: "T" },
          { subjectCode: "26831", subjectName: "Digital Electronics-I", failedType: "T" },
          {
            subjectCode: "28531",
            subjectName: "Application Development Using Python",
            failedType: "T",
          },
        ],
        passedList: [],
      },
      passed: false,
    },
    {
      publishedAt: "2024-03-03",
      semester: "2",
      result: {
        failedList: [],
        passedList: [
          { subjectCode: "25911", subjectName: "Mathematics -I", failedType: "T" },
          { subjectCode: "26811", subjectName: "Basic Electronics", failedType: "T" },
        ],
      },
      passed: true,
    },
    {
      publishedAt: "2023-10-19",
      semester: "1",
      result: {
        failedList: [],
        passedList: [
          { subjectCode: "25911", subjectName: "Mathematics -I", failedType: "T" },
          { subjectCode: "26711", subjectName: "Basic Electricity", failedType: "T" },
        ],
      },
      passed: true,
    },
  ],
};
