import axios from "axios";
const BOOK_API_BASE_URL="http://localhost:8080/login/";
class accountService{
     checkout(account){
       return axios.post(BOOK_API_BASE_URL,account);
    }
}
export default new accountService();