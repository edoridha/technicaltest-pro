import axios from "axios";

export default function useHookUser() {
  const url_api = "http://localhost:4000";

  const login = async (form) => {
    try {
      const { data } = await axios({
        method: "POST",
        url: `${url_api}/members/login`,
        data: form,
      });
      localStorage.setItem("access_token", data.access_token);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const createMember = async (form) => {
    try {
      await axios({
        method: "POST",
        url: `${url_api}/members`,
        data: form,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const editMember = async (id, form) => {
    try {
      await axios({
        method: "PUT",
        url: `${url_api}/members/${id}`,
        data: form,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
    } catch (error) {
      throw error;
    }
  };

  const deleteMember = async (id) => {
    try {
      await axios({
        method: "PATCH",
        url: `${url_api}/members/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
    } catch (error) {
      throw error;
    }
  };
  
  return { login, createMember, editMember, deleteMember };
}
