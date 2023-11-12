export const updateUserReducer = (state, action) => {
  switch (action.type) {
    case "init":
      return { ...state, ...action.payload };
    case "userName":
      return { ...state, userName: action.payload };

    case "email":
      return { ...state, email: action.payload };

    case "studentId":
      return { ...state, studentId: action.payload };

    case "teacherId":
      return { ...state, teacherId: action.payload };

    case "roleId":
      return { ...state, roleId: action.payload };

    case "password":
      return { ...state, password: action.payload };
    case "isActive":
      return { ...state, isActive: action.payload };

    case "confirmPassword":
      return { ...state, confirmPassword: action.payload };
  }
};
