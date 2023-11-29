import React from "react";
import GenericButton from "@/components/common/GenericButton";
import NewClaimButtonStyle from "./NewClaimButton.module.scss";
import { useRouter } from "next/navigation";

const NewClaimButton: React.FC = () => {
  const router = useRouter();
  return (
    <div className={NewClaimButtonStyle.newClaimButton}>
      <GenericButton
        label="New Claim"
        theme="normal"
        type="submit"
        btnClassname={NewClaimButtonStyle.newClaimBtn}
        onClickHandler={() => router.push("/new-claim")}
      />
    </div>
  );
};

export default NewClaimButton;
