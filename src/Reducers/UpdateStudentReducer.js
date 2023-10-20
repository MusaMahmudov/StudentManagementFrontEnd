export const updateStudentReducer = (state, action) => {
  switch (action.type) {
    case "init":
      return { ...state, ...action.payload };
    case "fullName":
      return { ...state, fullName: action.payload };

    case "yearOfGraduation":
      return { ...state, yearOfGraduation: action.payload };

    case "gender":
      return { ...state, gender: action.payload };

    case "educationDegree":
      return { ...state, educationDegree: action.payload };

    case "formOfEducation":
      return { ...state, formOfEducation: action.payload };

    case "typeOfPayment":
      return { ...state, typeOfPayment: action.payload };

    case "homePhoneNumber":
      return { ...state, homePhoneNumber: action.payload };

    case "phoneNumber":
      return { ...state, phoneNumber: action.payload };

    case "appUserId":
      return { ...state, appUserId: action.payload };

    case "dateOfBirth":
      return { ...state, dateOfBirth: action.payload };

    case "groups":
      return { ...state, groupId: action.payload };
    case "mainGroup":
      return { ...state, mainGroup: action.payload };
  }
};
