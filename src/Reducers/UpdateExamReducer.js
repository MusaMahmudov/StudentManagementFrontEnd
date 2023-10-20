export const updateExamReducer = (state, action) => {
  switch (action.type) {
    case "init":
      return { ...state, ...action.payload };
    case "name":
      return { ...state, name: action.payload };

    case "date":
      return { ...state, date: action.payload };

    case "examTypeId":
      return { ...state, examTypeId: action.payload };

    case "groupSubjectId":
      return { ...state, groupSubjectId: action.payload };
    case "maxScore":
      return { ...state, maxScore: action.payload };
  }
};
