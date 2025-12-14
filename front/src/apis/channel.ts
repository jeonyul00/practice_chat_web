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