import { HttpResponseInit } from '@azure/functions';
import HttpStatusCode from '../statusCodes';

/**
 * Returns a NOT_FOUND (404) error response
 * @param message Any additional information provided in the body of the response (default: 'NOT FOUND!')
 * @returns A 404 (NOT_FOUND) HttpResponseInit
 */
export function NotFound(message?: string): Promise<HttpResponseInit> {
  return new Promise((resolve) => {
    resolve({
      status: HttpStatusCode.NOT_FOUND,
      body: message || 'NOT FOUND!',
    });
  });
}

/**
 * Returns a INTERNAL_SERVER_ERROR (500) error response
 * @param message Any additional information provided in the body of the response (default: exception.message)
 * @returns A 500 (INTERNAL_SERVER_ERROR) HttpResponseInit
 */
export function Error(message?: string, exception?: Error): Promise<HttpResponseInit> {
  return new Promise((resolve) => {
    resolve({
      status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      body: message || exception?.message,
    });
  });
}

/**
 * Return NOT_IMPLEMENTED (501) with the string body: 'This method has not been implemented yet!'
 * @returns A 501 (NOT_IMPLEMENTED) http status code with a string in the body
 */
export function NOT_IMPLEMENTED(): Promise<HttpResponseInit> {
  return new Promise((resolve) => {
    resolve({
      status: HttpStatusCode.NOT_IMPLEMENTED,
      body: 'This method has not been implemented yet!',
    });
  });
}
