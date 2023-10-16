export const updateGroupReducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };

    case "year":
      return { ...state, year: action.payload };

    case "facultyId":
      return { ...state, facultyId: action.payload };

    case "studentsId":
      return { ...state, studentsId: action.payload };
  }
};
