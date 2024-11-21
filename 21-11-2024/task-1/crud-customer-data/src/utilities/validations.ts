export const validateContactNumber = (contact: string): boolean => {
    const regex = /^[0-9]{10}$/;
    return regex.test(contact);
  };
  
  export const validateYear = (year: number): boolean => {
    const currentYear = new Date().getFullYear();
    return year >= 2000 && year <= currentYear;
  };
  
  export const validateName = (name: string): boolean => {
    return name.trim().length > 2;
  };
  