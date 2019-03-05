
class SessionApi {  
    static login = async (credentials) => {
    //    debugger;
        const request = new Request('/', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}), 
            body: JSON.stringify({auth: credentials})
        });
    
        try {
            const response = await fetch(request);
            return await response;
        } catch (error) {
            console.log(`ERROR: ${error}`);
            return error;
        }
    } 
}
  
export default SessionApi;  