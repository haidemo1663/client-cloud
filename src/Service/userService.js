import axios from "axios";
const USER_API_BASE_URL="http://localhost:8080/users/";
class userService{
     getUser(){
        return axios.get(USER_API_BASE_URL);
    }
    createUser(user){
        return axios.post(USER_API_BASE_URL,user);
    }
    updateUser(user,id){
        return axios.post(USER_API_BASE_URL+id,user);
    }
    getUserById (id){
       return axios.get(USER_API_BASE_URL +id)
    }
    deleteUser(id){
        return axios.delete(USER_API_BASE_URL+id);
    }
}
export default new userService();