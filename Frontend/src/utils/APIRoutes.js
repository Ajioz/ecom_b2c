export const host = process.env.REACT_APP_SERVER_URL;
export const registerRoute = `${host}/api/chat/register`;
export const loginRoute = `${host}/api/chat/login`;
export const leaveRoute = `${host}/api/chat/leaveChat`;
export const deleteRoute = `${host}/api/chat/delete`;
export const allUsersRoute = `${host}/api/chat/allusers`;
export const onlineUsers = `${host}/api/chat/online/`;
export const sendMessageRoute = `${host}/api/chat/messages/add_msg`;
export const recieveMessageRoute = `${host}/api/chat/messages/get_msg`;
// export const setAvatarRoute = `${host}/api/chat/setavatar`;
// http://localhost:5001/api/chat/register