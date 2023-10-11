export const updateStudentReducer = (state, action) => {
  switch (action.type) {
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

    case "appUser":
      return { ...state, appUser: { id: action.payload } };

    case "dateOfBirth":
      return { ...state, dateOfBirth: action.payload };

    case "groups":
      return { ...state, groups: action.payload };
  }
};
