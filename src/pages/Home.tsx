import React from "react";
import { User } from "~security/User";

export interface HomeProps {
    user: User;
}

export const Home = (props: HomeProps) => {
    return <div>{props.user.email}</div>;
}