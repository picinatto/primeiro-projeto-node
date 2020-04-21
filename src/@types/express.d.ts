// Declare the namespace edited
declare namespace Express {
  // Select the interface attached
  // We don't overwrite the whole interface
  // Only add new fields or edit the ones listed
  export interface Request {
    // Adding the custom fields
    user: {
      id: string;
    };
  }
}
