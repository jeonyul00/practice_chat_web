import api from ".";

export const getWorkspaceList = async () => {
  const response = await api.get(`/workspaces`);
  return response.data;
};

export const createWorkspace = async (data: {
  workspace: string;
  url: string;
}) => {
  const response = await api.post(`/workspaces`, data);
  return response.data;
};

export const inviteWorkspaceMember = async (
  workspace: string,
  email: string
) => {
  const response = await api.post(`/workspaces/${workspace}/members`, {
    email,
  });
  return response.data;
};

export const getWorkspaceMembers = async (workspace: string) => {
  const response = await api.get(`/workspaces/${workspace}/members`);
  return response.data;
};
