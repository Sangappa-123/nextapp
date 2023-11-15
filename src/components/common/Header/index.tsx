"use client";
import React, { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";
import NavStyle from "./headerStyle.module.scss";
import { logoutHandler } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/reduxCustomHook";
import { resetSessionState } from "@/reducers/Session/SessionSlice";

const NavBarMenu = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const loggedInUser = {
    firstName: "John",
    lastName: "Doe",
  };
  const signoutHandle = () => {
    dispatch(resetSessionState());
    logoutHandler();
    router.replace("/login");
  };

  return (
    <div>
      <nav className={NavStyle.navbar}>
        {/* <div className={NavStyle.showNav}> */}
        <div className={NavStyle.companyName}>Evolution Insurance Company</div>
        <div className={NavStyle.searchBox}>
          <input type="text" placeholder="What can we help you find?" />
          <RiSearch2Line className={NavStyle.searchIcon} />
        </div>
        <div className={NavStyle.userInfo}>
          <div className={NavStyle.userAvatar}>
            {loggedInUser.firstName.charAt(0)}
            {loggedInUser.lastName.charAt(0)}
          </div>
          <div className={NavStyle.userName}>
            {loggedInUser.firstName} {loggedInUser.lastName}
          </div>
        </div>
        <div className={NavStyle.signoutText} onClick={signoutHandle}>
          Sign Out
        </div>
      </nav>
      <div className={NavStyle.toggleButton} onClick={toggleMenu}>
        <HiOutlineMenu />
      </div>
      <div className={`${NavStyle.menuItems} ${isMenuOpen ? NavStyle.show : ""}`}>
        <div className={NavStyle.calendarIcon}>Calendar Icon</div>
        <div className={NavStyle.helpText}>Help</div>
        <div className={NavStyle.helpText}>Sign Out</div>
      </div>
    </div>
  );
};

export default NavBarMenu;
