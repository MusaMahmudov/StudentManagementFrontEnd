export const updateGroupSubjectReducer = (state, action) => {
  switch (action.type) {
    case "init":
      return { ...state, ...action.payload };
    case "groupId":
      return { ...state, groupId: action.payload };

    case "subjectId":
      return { ...state, subjectId: action.payload };

    case "credits":
      return { ...state, credits: action.payload };

    case "totalWeeks":
      return { ...state, totalWeeks: action.payload };
    case "hours":
      return { ...state, hours: action.payload };
    case "semester":
      return { ...state, semester: action.payload };
    case "year":
      return { ...state, year: action.payload };
    case "teacherRole":
      return {
        ...state,
        teacherRole: [...state.teacherRole, ...action.payload],
      };
  }
};
