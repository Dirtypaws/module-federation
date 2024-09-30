import { HttpResponseInit } from '@azure/functions';
import HttpStatusCode from '../statusCodes';

/**
 * Returns a PROCESSING (102) result informing the user that work is being completed in the background
 * @param message String to include in the body of response (default: 'processing')
 * @returns A 102 (PROCESSING) HttpResponseInit
 */
export function Processing(message?: string): Promise<HttpResponseInit> {
  return new Promise((resolve) => {
    resolve({
      status: HttpStatusCode.PROCESSING,
      body: message || 'processing',
    });
  });
}
