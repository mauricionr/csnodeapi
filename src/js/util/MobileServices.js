import { apiUrl, apiKey } from './Constants';

const client = new WindowsAzure.MobileServiceClient(apiUrl, apiKey);

export default client; 