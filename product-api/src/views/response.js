export const successResponse = (res, data, message = 'Request successful') => {
    res.status(200).json({ success: true, message, data });
  };
  
  export const errorResponse = (res, message = 'An error occurred', statusCode = 500) => {
    res.status(statusCode).json({ success: false, message });
  };
  