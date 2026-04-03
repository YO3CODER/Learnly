import { auth } from "@clerk/nextjs"

const adminIds = [
  "user_39VJPCANXJRtYrha41TcZLdWUM2",
];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
