
import Link from "next/link";
import NavBarStyle from "./navbar.module.scss";

export default function NavBarComponent() {
  return(
    <div className={NavBarStyle.container}>
      <Link href="/">Home</Link>
      <Link href="/dashboard">About</Link>
      <Link href="/dashboard">Contact</Link>
      <Link href="/help">Help</Link>
    </div>
  )
}