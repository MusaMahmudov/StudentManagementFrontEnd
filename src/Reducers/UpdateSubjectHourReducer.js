export const updateSubjectHourReducer = (state, action) => {
  switch (action.type) {
    case "init":
      return { ...state, ...action.payload };
    case "room":
      return { ...state, room: action.payload };

    case "lessonTypeId":
      return { ...state, lessonTypeId: action.payload };

    case "groupSubjectId":
      return { ...state, groupSubjectId: action.payload };

    case "startTime":
      return { ...state, startTime: action.payload };

    case "endTime":
      return { ...state, endTime: action.payload };

    case "dayOfWeek":
      return { ...state, dayOfWeek: action.payload };
  }
};
