export type UserType = {
  user_id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar: string;
  birthday: Date;
  password: string;
};

export type PostType = {
  post_id: number;
  user_id: number;
  image: string;
  date_posted: string;
  caption: string;
  num_likes: string;
};
