import React from "react";
import { User } from "~User";

export interface HomeProps {
  user: User;
}

export const Home = (props: HomeProps): JSX.Element => {
  return <div>{props.user.basicInfo.email}</div>;
};
