import axios from "axios";
import { jwtDecode } from "jwt-decode";
import type { UserProfile } from "../../types";

const API_BASE_URL = "/api"; // Proxied to http://localhost:8080

interface JwtTokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

export const signIn = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    console.log("Sign-in response data:", response.data);
    if (typeof response.data === "string") {
      localStorage.setItem("jwtToken", response.data);
    } else if (response.data && response.data.token) {
      localStorage.setItem("jwtToken", response.data.token);
    }
    return response.data;
  } catch (error: any) {
    console.error(
      "Error during sign-in (frontend):",
      error.response?.data || error.message || error
    );
    throw error;
  }
};

export const signUp = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error during sign-up:", error);
    throw error;
  }
};

export const getLoggedInUser = async (): Promise<UserProfile | null> => {
  console.log("Getting logged in user");
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    console.log("No JWT token found in localStorage.");
    return null;
  }

  console.log("JWT Token found:", token);
  try {
    const decoded = jwtDecode<JwtTokenPayload>(token);
    console.log("Decoded JWT Payload (from token):", decoded);

    const profileResponse = await axios.get(
      `${API_BASE_URL}/api/users/profile`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("User Profile API Response Data:", profileResponse.data);
    const userProfile: UserProfile = profileResponse.data;

    const finalUser = { ...userProfile, email: decoded.sub };
    console.log("Final User Object to be returned:", finalUser);
    return finalUser;
  } catch (error: any) {
    console.error(
      "Error fetching user profile:",
      error.response?.data || error.message || error
    );
    return null;
  }
};

export const signOut = async () => {
  try {
    localStorage.removeItem("jwtToken");
    return { success: true, message: "Signed out successfully" };
  } catch (error) {
    console.error("Error during sign-out:", error);
    throw error;
  }
};
