import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getLogout = () =>{
    cookies.remove("userNic");
    cookies.remove("userName");
    return cookies.remove("Authorization", { path: "/" });
}