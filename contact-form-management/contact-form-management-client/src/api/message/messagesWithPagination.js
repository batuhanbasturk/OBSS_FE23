import { server } from "../../server/server";
import axios from "axios";

export const fetchMessagesWithPagination = async (
  page,
  pageSize,
  sortBy,
  sortOrder,
  token
) => {
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
  if (response.status === 200) {
    return response.data.data.messages;
  } else {
    console.log("Something went wrong.");
  }
};
