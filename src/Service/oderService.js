import axios from "axios";
const USER_API_BASE_URL="http://localhost:8081/orders/";
class orderService{
     getOrder(){
        return axios.get(USER_API_BASE_URL);
    }
    createOrder(order){
        return axios.post(USER_API_BASE_URL,order);
    }
    getOderById (id){
       return axios.get(USER_API_BASE_URL +id)
    }
}
export default new orderService();