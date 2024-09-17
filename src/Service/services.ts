import { baseURL } from '@/Constants/constants';
import axios from 'axios';

 // Ensure this is set to your actual base URL

// Function to fetch leads with query parameters
export const fetchLeads = async (params: {
  from?: Date;
  to?: Date;
  state?: string;
  status?: string;
  strength?: string;
  dealValue?: string;
}) => {
  try {
    const response = await axios.get(`${baseURL}/lead`, { params });
    return response.data; // Return the data directly
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
export const fetchPipeLineLeads = async (params: {
  from?: Date;
  to?: Date;
  teamMember?:string;
  status?:string
}) => {
  try {

    console.log("first")
    const response = await axios.get(`${baseURL}/pipelineLead`, { params });
    return response.data; // Return the data directly
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};