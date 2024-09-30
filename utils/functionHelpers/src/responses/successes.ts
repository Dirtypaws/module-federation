import { HttpResponseInit } from '@azure/functions';
import HttpStatusCode from '../statusCodes';

/**
 * Returns an OK (200) http status response with a string body
 * @param message Any message that would accompany the response (default: 'success')
 * @returns 200 OK HttpResponseInit
 */
export function Success(message?: string): Promise<HttpResponseInit> {
  return new Promise((resolve) => {
    resolve({
      status: HttpStatusCode.OK,
      body: message || 'success',
    });
  });
}

/**
 * Returns an OK (200) http status response with a serialized JSON body
 * @param body An object that will be returned in the jsonBody of the response
 * @returns 200 (OK) HttpResponseInit
 */
export function Ok<T>(body: T): Promise<HttpResponseInit> {
  return new Promise((resolve) => {
    resolve({
      status: HttpStatusCode.OK,
      jsonBody: body,
    });
  });
}

/**
 * Returns a CREATED (201) http status response with `{ id: {param} }` as the body
 * @param id The id returned in the body of the response
 * @returns 201 (CREATED) HttpResponseInit
 */
export function Created(id: string): Promise<HttpResponseInit> {
  return new Promise((resolve) => {
    resolve({
      status: HttpStatusCode.CREATED,
      jsonBody: { id },
    });
  });
}

/**
 * Returns an ACCEPTED (202) http status response with a string body
 * @param message Any message that would accompany the response (default: 'accepted')
 * @returns 202 ACCEPTED HttpResponseInit
 */
export function Accepted(message?: string): Promise<HttpResponseInit> {
  return new Promise((resolve) => {
    resolve({
      status: HttpStatusCode.ACCEPTED,
      body: message || 'accepted',
    });
  });
}
