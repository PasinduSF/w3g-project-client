export const validateFormFields = (formData) => {
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
  
    const emailRegex = /^\s*\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+\s*$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
  
    if (!formData.mobileNumber) {
      errors.mobileNumber = 'Mobile number is required';
    } else if (formData.mobileNumber.length > 15) {
      errors.mobileNumber = 'Mobile number must be less than 15 characters';
    }
  
    if (!formData.dob) {
      errors.dob = 'Date of birth is required';
    }
  
    if (!formData.selectedOption) {
      errors.gender = 'Gender is required';
    }
  
    return errors;
  };