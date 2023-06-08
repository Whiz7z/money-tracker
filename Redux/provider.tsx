"use client";
import Reacr from "react";
import { Provider } from "react-redux";

import { store } from "./store";
type Props = {
  children: React.ReactNode;
};
export function Providers(props: Props) {
  return <Provider store={store}>{props.children}</Provider>;
}
