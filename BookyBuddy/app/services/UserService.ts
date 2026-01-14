import { fetchClient} from "~/services/api";

const URL = "https://bookbuddy-container-debug.icybay-b9183a86.germanywestcentral.azurecontainerapps.io/users"

const UserService = {
    getMe: async (): Promise<string> => {
        return await fetchClient("/users/me");
    },
    deleteUser: async (): Promise<null> => {
      return await fetchClient("users/me",{
          method: "DELETE"
      })
    }
};

export default UserService