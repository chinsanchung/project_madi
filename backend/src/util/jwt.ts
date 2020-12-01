import jwt from 'jsonwebtoken';

export const createToken = ({
  userId,
  jwtSecret,
}: {
  userId: string;
  jwtSecret: string;
}) => {
  const accessToken = jwt.sign({ userId }, jwtSecret, { expiresIn: 3600000 });
  const refreshToken = jwt.sign({ userId }, jwtSecret, {
    expiresIn: 604800000,
  });
  console.log('jwt', jwtSecret);
  console.log('acc', accessToken);
  return { accessToken, refreshToken };
};
