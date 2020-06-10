import React from "react";
import { User } from "~User";

export interface HomeProps {
  user: User;
}

export const Home = (props: HomeProps) => {
  return <div>{props.user.basicInfo.email}</div>;
};
