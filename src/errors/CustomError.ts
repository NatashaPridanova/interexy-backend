abstract class CustomError extends Error {
  abstract errorCode: number;
  abstract errorType: string;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  convertToResponse = () => {
    return {
      errorMessage: this.message,
      errorCode: this.errorCode,
      errorType: this.errorType,
    };
  };
}

export default CustomError;
