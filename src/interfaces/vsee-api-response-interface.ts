import { ApiResponseInterface } from './api-response-interface';

export interface VSeeApiResponseInterface extends ApiResponseInterface {
  data: { data: { id: string } };
}
