import React from "react";
import replacementItemRapidSectionStyle from "./replacementItemRapidSection.module.scss";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";

function ReplacementItemRapidSection() {
  const imgUrl =
    "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRbecbSwoWkz_Si5UllTomQHi1gZvM7Xr6UofD93U_EzPhGVsgoPIqxfhinO8v9sO8YQGVX_uE4GBr0DJrF6ukw-my0cQ_sh_kyd-XKrnt4&usqp=CAE";
  return (
    <div className={replacementItemRapidSectionStyle.root}>
      <h5 className={replacementItemRapidSectionStyle.heading}>Replacement Item</h5>
      <div>Smead Pressboard Classification Folders, 2 Dividers, Legal size, 100%</div>
      <div className={replacementItemRapidSectionStyle.content}>
        <div className={replacementItemRapidSectionStyle.removeIcon}>
          <IoMdClose size={20} className={replacementItemRapidSectionStyle.icon} />
        </div>
        <div className={replacementItemRapidSectionStyle.productImage}>
          <Image
            unoptimized={true}
            src={imgUrl}
            alt="products"
            fill={true}
            sizes="100%"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className={replacementItemRapidSectionStyle.calculations}>
          <label>Cost Per Unit</label>
          <div>$14.95</div>
          <label>Total Replacement Cost</label>
          <div>$14.95</div>
          <label>Total Cash Value</label>
          <div>$14.95</div>
        </div>
      </div>
    </div>
  );
}

export default ReplacementItemRapidSection;
