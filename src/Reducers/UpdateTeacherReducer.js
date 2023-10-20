export const updateTeacherReduce = (state, action) => {
  switch (action.type) {
    case "init":
      return { ...state, ...action.payload };

    case "fullName":
      return { ...state, fullName: action.payload };
    case "appUserId":
      return { ...state, appUserId: action.payload };
    case "mobileNumber":
      return { ...state, mobileNumber: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "address":
      return { ...state, address: action.payload };
    case "gender":
      return { ...state, gender: action.payload };
    case "dateOfBirth":
      return { ...state, dateOfBirth: action.payload };
  }
};
