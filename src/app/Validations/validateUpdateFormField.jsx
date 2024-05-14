export const validateUpdateFormFields = (formData) => {
    const errors = {};
  
    // Check if all required fields are empty
    const allFieldsEmpty =
      !formData.firstName &&
      !formData.lastName &&
      !formData.email &&
      !formData.mobileNumber &&
      !formData.dob &&
      !formData.gender;
  
    if (allFieldsEmpty) {
      errors.AllFields = 'All fields are required';
      return errors;
    }
  
    // Validate individual fields
    if (!formData.firstName) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.length > 25) {
      errors.firstName = 'First name must be less than 25 characters';
    }
  
    if (!formData.lastName) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.length > 25) {
      errors.lastName = 'Last name must be less than 25 characters';
    }
  
    const emailRegex = /^\s*\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})\s*$/;
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
  
    if (!formData.mobileNumberOne) {
      errors.mobileNumberOne = 'Mobile number is required';
    } else if (formData.mobileNumberOne.length > 15 || formData.mobileNumberTwo.length > 15 || formData.mobileNumberThree.length > 15 ) {
      errors.mobileNumber = 'Mobile number must be less than 15 characters';
    }
  
    if (!formData.dob) {
      errors.dob = 'Date of birth is required';
    }

    const toUpperCase = (str) => {
      return str.toUpperCase();
    }

     const genderTest = toUpperCase(formData.gender);
     if (genderTest !== "MALE" && genderTest !== "FEMALE") {
       errors.gender = 'Gender must be male or female';
     }
  
    return errors;
  };