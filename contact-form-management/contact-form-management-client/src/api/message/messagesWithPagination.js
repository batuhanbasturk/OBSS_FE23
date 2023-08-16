import { server } from "../../server/server";
import axios from "axios";

export const fetchMessagesWithPagination = async (
  page,
  pageSize,
  sortBy,
  sortOrder,
  token
) => {
  try {
    const response = await axios.get(`${server}/api/messages-with-pagination`, {
      params: {
        page,
        pageSize,
        sortBy,
        sortOrder,
      },
      headers: {
        token: `${token}`,
      },
    });
    return response.data.data.messages;
  } catch (err) {
    return Promise.reject(err.response.data.error);
  }
};
