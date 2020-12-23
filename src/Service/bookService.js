import axios from "axios";
const BOOK_API_BASE_URL="http://localhost:8080/books/";
class bookService{
     getBook(){
        return axios.get(BOOK_API_BASE_URL);
    }
     createBook(book){
        return axios.post(BOOK_API_BASE_URL,book);
    }
    updateBook(book,id){
        return axios.post(BOOK_API_BASE_URL+id,book);
    }
    getBookById (id){
       return axios.get(BOOK_API_BASE_URL+id);
    }
    deleteBook(id){
        return axios.delete(BOOK_API_BASE_URL+id);
    }
}
export default new bookService();