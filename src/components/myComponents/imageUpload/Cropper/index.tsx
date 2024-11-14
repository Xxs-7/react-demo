/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useRef, useState } from "react";
// @ts-ignore
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Dialog } from "@mui/material";
import styles from "./index.module.less";

export interface CropperProps {
  title?: string;
  onApply: (src: string) => void;
  onCancel: () => void;
  defaultImage: string;
  open: boolean;
  minCropBoxHeight?: number;
  minCropBoxWidth?: number;
  crop?: (corpper: any, width: number, height: number) => void;
  aspectRatio?: number;
  boxHeight?: number;
  boxWidth?: number;
}

const getImageSize = (
  src: any
): Promise<{
  width: number;
  height: number;
}> => {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = function () {
      const { width, height } = this as any;
      resolve({ width, height });
    };
    image.src = src;
  });
};

export const Croppers = ({
  title = "Crop",
  onApply,
  defaultImage,
  open,
  crop,
  onCancel,
  boxHeight = 400,
  boxWidth = 400,
  ...reset
}: CropperProps) => {
  const cropper = useRef<any>();
  const [zoomTo, setZoomTo] = useState<number>(1);
  const getZoomTo = async () => {
    if (!boxHeight || !boxWidth) {
      return;
    }
    const { width, height } = await getImageSize(defaultImage);
    setZoomTo(Math.min(boxWidth / width, boxHeight / height));
  };
  useLayoutEffect(() => {
    getZoomTo();
  }, []);

  const getCropData = () => {
    if (typeof cropper.current !== "undefined") {
      // uploadImage({ uri: cropper.getCroppedCanvas().toDataURL() }).then(
      //   (resData: any) => {
      //     if (resData) {
      //       console.log(resData, 'resData')
      //       // console.log('----------- resData.uri:', resData.uri)
      //       // setCropData(`https://reachplatform.s3.us-east-2.amazonaws.com/${resData.uri}`);
      //       onClose &&
      //         onClose(
      //           `https://reachplatform.s3.us-east-2.amazonaws.com/${resData.uri}`
      //         )
      //     }
      //   }
      // )
      onApply(cropper.current.cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      classes={{
        paper: styles["rewrite-paper"],
        root: styles["rewrite-root"],
      }}
    >
      <div className={styles["content"]}>
        <h2>{title}</h2>
        {/* @ts-ignore */}
        <Cropper
          ref={cropper}
          zoomTo={zoomTo}
          preview=".img-preview"
          src={defaultImage}
          viewMode={1}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
          crop={(e) =>
            crop?.(cropper.current.cropper, e.detail.width, e.detail.height)
          }
          center={true}
          style={{
            width: boxWidth,
            height: boxHeight,
          }}
          {...reset}
        />
        <div className={styles["content-footer"]}>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={getCropData}>Apply</button>
        </div>
      </div>
    </Dialog>
  );
};

export default Croppers;
