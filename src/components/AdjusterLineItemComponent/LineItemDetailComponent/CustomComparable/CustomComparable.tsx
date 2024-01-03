import React, { useRef, useState } from "react";
import customComparableStyle from "./customComparable.module.scss";
import GenericInput from "@/components/common/GenericInput";
import Image from "next/image";
import noImage from "@/assets/images/no-image.png";
import { IoMdCloseCircle } from "react-icons/io";

function CustomComparable() {
  const fileRef = useRef<null | HTMLInputElement>(null);
  const [file, setFile] = useState<File>();

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files && e.target.files.length > 0) {
      setFile(e?.target?.files[0]);
    }
  };

  const removeFile = () => {
    setFile(undefined);
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  return (
    <form className={customComparableStyle.root}>
      <div className={customComparableStyle.imageContainer}>
        <div className={customComparableStyle.imageDiv}>
          {file && (
            <IoMdCloseCircle
              className={customComparableStyle.clearImage}
              size={24}
              onClick={removeFile}
            />
          )}
          <div className={customComparableStyle.imageWrapper}>
            <Image
              unoptimized={true}
              src={file ? URL.createObjectURL(file) : noImage}
              alt="products"
              fill={true}
              sizes="100%"
              style={{ objectFit: "fill" }}
            />
          </div>
        </div>
        <div className={customComparableStyle.fileName}>{file ? file.name : "..."}</div>
        <div
          className={customComparableStyle.fileInput}
          onClick={() => fileRef?.current?.click()}
        >
          Click to add attachment
        </div>
        <input type="file" hidden ref={fileRef} onChange={handleFileSelection} />
      </div>
      <div className={customComparableStyle.formContent}>
        <div className={customComparableStyle.formGroup}>
          <label htmlFor="description">
            <span className="text-danger">*</span> Replacement Description
          </label>
          <textarea id="description" />
        </div>
        <div className={customComparableStyle.section2}>
          <div className={customComparableStyle.formGroup}>
            <label htmlFor="totalCost">
              <span className="text-danger">*</span> Total Cost
            </label>
            <GenericInput id="totalCost" />
          </div>
          <div className={customComparableStyle.formGroup}>
            <label htmlFor="qty">
              <span className="text-danger">*</span> Quantity
            </label>
            <GenericInput id="qty" />
          </div>
          <div className={customComparableStyle.formGroup}>
            <label htmlFor="tax">
              <span className="text-danger">*</span> Tax(@12%)
            </label>
            <GenericInput id="tax" />
          </div>
        </div>
        <div className={customComparableStyle.section3}>
          <div className={customComparableStyle.formGroup}>
            <label htmlFor="replaceCost">
              <span className="text-danger">*</span> Total Replacement Cost
            </label>
            <GenericInput id="replaceCost" />
          </div>
          <div className={customComparableStyle.formGroup}>
            <label htmlFor="supplier">Supplier Name</label>
            <GenericInput id="supplier" />
          </div>
        </div>
        <div>
          <div className={customComparableStyle.formGroup}>
            <label htmlFor="website">Supplier&apos;s Website (If any)</label>
            <GenericInput id="website" />
          </div>
        </div>
      </div>
    </form>
  );
}

export default CustomComparable;
