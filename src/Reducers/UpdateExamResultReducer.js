export const updateExamResultReducer = (state, action) => {
  switch (action.type) {
    case "init":
      return { ...state, ...action.payload };
    case "studentId":
      return { ...state, studentId: action.payload };

    case "examId":
      return { ...state, examId: action.payload };

    case "score":
      return { ...state, score: action.payload };
  }
};
