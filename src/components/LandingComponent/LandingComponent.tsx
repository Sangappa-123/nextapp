import Link from "next/link";
import LandingStyle from "./landing.module.scss";

export default function LandingComponent() {
  return (
    <div className={LandingStyle.container}>
      <div className={LandingStyle.content}>Landing page</div>
      <Link href="/dashboard">go to dashboard</Link>
    </div>
  )
}