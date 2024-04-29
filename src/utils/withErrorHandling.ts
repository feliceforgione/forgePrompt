import { z } from "zod";

export type ReturnValue<T> = { data: T } | { error: string };

// Special Error class to extent stand Error. Change the constructor properties to fit your needs
export class MySpecialError extends Error {
  errorCode: number;
  constructor(message: string) {
    super(message);
    this.name = "My Special Error";
    this.errorCode = 12345;
  }
}

export const withErrorHandling = (fn: any) => {
  return async () => {
    try {
      await fn();
    } catch (error) {
      if (error instanceof MySpecialError) {
        return { error: `${error.errorCode}-${error.name}: ${error.message}` };
      } else if (error instanceof z.ZodError) {
        return { error: error.issues[0].message };
      } else if (error instanceof Error) {
        return { error: error.message };
      } else {
        return { error: "Generic error" };
      }
    }
  };
};
