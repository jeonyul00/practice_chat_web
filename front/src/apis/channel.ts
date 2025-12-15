import api from ".";

export const getChannelList = async (workspace: string) => {
  const response = await api.get(`/workspaces/${workspace}/channels`);
  return response.data;
};

export const createChannel = async (
  workspace: string,
  data: { name: string }
) => {
  const response = await api.post(`/workspaces/${workspace}/channels`, data);
  return response.data;
};

export const getChannelChats = async (
  workspace: string,
  channel: string,
  perPage: number = 20,
  page: number = 1
) => {
  const response = await api.get(
    `/workspaces/${workspace}/channels/${channel}/chats`,
    {
      params: { perPage, page },
    }
  );
  return response.data;
};

export const postChannelChat = async (
  workspace: string,
  channel: string,
  content: string
) => {
  const response = await api.post(
    `/workspaces/${workspace}/channels/${channel}/chats`,
    { content }
  );
  return response.data;
};

export const getDMChats = async (
  workspace: string,
  id: number,
  perPage: number = 20,
  page: number = 1
) => {
  const response = await api.get(`/workspaces/${workspace}/dms/${id}/chats`, {
    params: { perPage, page },
  });
  return response.data;
};

export const postDMChat = async (
  workspace: string,
  id: number,
  content: string
) => {
  const response = await api.post(`/workspaces/${workspace}/dms/${id}/chats`, {
    content,
  });
  return response.data;
};
