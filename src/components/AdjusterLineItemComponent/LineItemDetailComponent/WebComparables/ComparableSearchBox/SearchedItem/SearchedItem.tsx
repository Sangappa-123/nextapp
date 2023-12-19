import React from "react";
import { unknownObjectType } from "@/constants/customTypes";
import Image from "next/image";
import searchedItemStyle from "./searchedItem.module.scss";
import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import { SEARCH_COMPARABLE_DESC_LIMIT } from "@/constants/constants";
import GenericButton from "@/components/common/GenericButton";
import { getUSDCurrency } from "@/utils/utitlity";

type propsType = {
  key: number;
  data: unknownObjectType;
};

function SearchedItem(props: propsType) {
  const { key, data = {} } = props;
  const imgUrl = data?.itemImage;
  function getStarCount(num: number) {
    let numberOfStars = Math.ceil(parseFloat(`${num}`));
    if (numberOfStars > 5) numberOfStars = 5;
    const data = new Array(numberOfStars);
    for (let i = 0; i < data.length; i++) {
      data[i] = i;
    }
    return data;
  }

  const StarRating = ({ rating }: { rating: number }) => {
    const stars = getStarCount(rating).map((a: number) => {
      if (!(rating >= a + 1) && rating >= a + 1 - 1) {
        return <FaStarHalfAlt key={a} fill="#ff4500" />;
      } else if (rating >= a + 1) {
        return <FaStar key={a} fill="#ff4500" />;
      }
    });
    return (
      <>
        {stars}
        {stars.length < 5 &&
          new Array(5 - stars.length)
            .fill(0)
            .map((_, i) => <FaStar key={i} fill="#8d8b89" />)}
      </>
    );
  };

  const getShortDesc = (desc: string) => {
    if (desc.length > 60) return desc.slice(0, SEARCH_COMPARABLE_DESC_LIMIT) + "...";
    return desc;
  };

  return (
    <div key={key} className={searchedItemStyle.root}>
      <div className={searchedItemStyle.imageDiv}>
        <Image
          unoptimized={true}
          src={imgUrl}
          alt="products"
          fill={true}
          sizes="100%"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className={searchedItemStyle.content}>
        <div className={searchedItemStyle.descDiv}>
          <div className={searchedItemStyle.descDetail}>
            <div className={searchedItemStyle.desc}>
              {getShortDesc(data?.description)}
            </div>
            <div className={searchedItemStyle.rating}>
              5.0
              <StarRating rating={data?.rating ?? 0} />
            </div>
          </div>
          <div className={searchedItemStyle.merchant}>
            <span>Merchant: </span>
            {data?.merchant ?? ""}
          </div>
          <a target="_blank" href={data?.itemURL ?? "#"}>
            View More
          </a>
        </div>
        <div className={searchedItemStyle.actionDiv}>
          <div className={searchedItemStyle.price}>
            {getUSDCurrency(+data?.itemPrice ?? 0)}
          </div>
          <GenericButton
            label="Mark as Replacement"
            theme="existingDarkBlueBtn"
            size="medium"
          />
          <GenericButton
            label="Add to Comparable"
            theme="existingDarkBlueBtn"
            size="medium"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchedItem;
