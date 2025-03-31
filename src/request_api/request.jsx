import axios from "axios";

export const addSurveyRequest = async (newSurvey) => {
    console.log(newSurvey);
    try {
      const response = await axios.post("https://encuestaapi.onrender.com/survey", newSurvey, {
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
  
