export const updateTeacherReduce = (state, action) => {
  switch (action.type) {
    case "fullName":
      return { ...state, fullName: action.payload };
    case "appUserId":
      return { ...state, appUser: { id: action.payload } };
    case "mobileNumber":
      return { ...state, mobileNumber: action.payload };
    case "eMail":
      return { ...state, eMail: action.payload };
    case "address":
      return { ...state, address: action.payload };
    case "gender":
      return { ...state, gender: action.payload };
    case "dateOfBirth":
      return { ...state, dateOfBirth: action.payload };
  }
};
