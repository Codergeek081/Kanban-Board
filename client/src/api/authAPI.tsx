import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  
  try {
    // Debugging: Log the user info being sent
    console.log("Sending login date", userInfo);
    // Making a POST request to the login route
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(userInfo)
    });
    if (!response.ok) {
      const errorMessage= `Login failed: ${response.status} ${response.statusText}`;
      console.error(errorMessage);
      throw new Error (errorMessage);
    }
      // Parse the JSON response
    const data = await response.json();
    console.log("Login response:", data)//Debugging;
    return data;
    } catch (error) {
      console.error("Error during login request:", error);
      throw error;
    }
  };








export { login };
