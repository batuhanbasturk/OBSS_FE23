import { server } from "../../server/server";
import axios from "axios";

export const fetchMessagesWithPaginationScroll = async (
  token,
  page,
  pageSize
) => {
  try {
    const response = await axios.get(`${server}/api/messages-with-scroll`, {
      params: {
        page,
        pageSize,
      },
      headers: {
        token: `${token}`,
      },
    });
    return response.data.data.messages;
  } catch (err) {
    console.log(err);
  }
};
