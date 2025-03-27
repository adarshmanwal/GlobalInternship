import { checkAuthLoader } from '../utils/auth';
import { loader as userDataLoader } from './usersDataLoader';
export async function HomePageLoaders() {
  const authCheck = checkAuthLoader();
  if (authCheck instanceof Response) {
    return authCheck;
  }
  return await userDataLoader();
}