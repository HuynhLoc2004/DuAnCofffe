import React from "react";

let checklogout = 1;
export const unlogout = () => {
  return (checklogout = 0);
};
export const logout = () => {
  return (checklogout = 1);
};
export const getLogout = () => {
  return checklogout;
};
