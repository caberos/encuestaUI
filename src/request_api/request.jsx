import axios from "axios";

export const addSurveyRequest = async (newSurvey) => {
    console.log(newSurvey);
    try {
      const response = await axios.post("http://192.168.0.126:5000/survey", newSurvey, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  };
  
