import httpClient from "../utils/httpClient";


export async function UserDetailsLoader({request,params}){
    const response = await httpClient.get(`/api/users/${params.id}`);
    if (response.status === 401 || response.status === 422) {
      return response;
    }
    return response.data.data;
  }
  