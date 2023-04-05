import axios from "axios"

export const  getUser = async (token) => {

    try {
        const response = await axios.get('http://localhost:4001/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        return response.data
        
    } catch (err) {
        console.log(err)
        return err
    }
}
