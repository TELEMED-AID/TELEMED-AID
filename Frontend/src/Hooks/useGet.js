import { useDispatch } from "react-redux";
import { useState } from "react";
import { axiosInstance } from "../API/axios";
import { setSnackbar } from "../Redux/snackBarSlice";

const useGet = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getItem = async (
    URL,
    postCallback = () => {},
    successMessage = null,
    errorMessage = "Internal Server Error!"
  ) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(URL);
      if (successMessage) {
        dispatch(
          setSnackbar({
            open: true,
            message: successMessage,
            error: false,
          })
        );
      }
      postCallback(response.data); // Pass data to the callback
      return response.data;
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message:
            error.response?.data?.message || errorMessage,
          error: true,
        })
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, getItem };
};

export default useGet;
