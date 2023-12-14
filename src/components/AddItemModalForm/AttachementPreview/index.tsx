import React from "react";

interface AttachementPreviewProps {
  url: string;
  imgType: string;
  zoomLevel: number;
}

const AttachementPreview: React.FC<AttachementPreviewProps> = ({
  url,
  imgType,
  zoomLevel,
}) => {
  console.log(imgType, "imagePreviewUrl");

  return imgType === "pdf" ? (
    <div
      style={{
        width: "100%",
        height: "300px",
        overflow: "hidden",
      }}
    >
      <iframe
        style={{
          transform: `scale(${zoomLevel})`,
          transition: "transform 0.2s",
          display: "inline-block",
          objectFit: "cover",
          height: "400px",
          aspectRatio: 600 / 600,
        }}
        src={url}
      />
    </div>
  ) : (
    <div
      style={{
        width: "100%",
        height: "400px",
        overflow: "hidden",
      }}
    >
      <img
        style={{
          transform: `scale(${zoomLevel})`,
          transition: "transform 0.2s",
          display: "inline-block",
          objectFit: "cover",
          height: "400px",
          aspectRatio: 600 / 600,
        }}
        src={url}
      />
    </div>
  );
};

export default AttachementPreview;
