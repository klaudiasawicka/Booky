import { fetchClient} from "~/services/api";

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