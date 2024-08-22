import type { UploadProps } from "rc-upload";
import Upload from "rc-upload";
import type { RcFile } from "rc-upload/lib/interface";
import { CSSProperties, ReactNode, useRef, useState } from "react";
// import "./index.less";
export interface FileVaildProps {
  file: RcFile;
  width: number;
  height: number;
}

export interface FileInfo {
  name: string;
  src: string;
  base64: string;
}

export interface UploaderProps {
  handleUpload?: (file: FileInfo) => void;
  isFileVaild?: (props: FileVaildProps) => string;
  needCrop?: boolean; // 选择图片后是否需要裁剪
  // cropProps?: Partial<CropperProps>; // 裁剪属性
  children?: ReactNode; // 自定义上传组件样式
  showImg?: boolean; // 是否在图片上传完毕后替换为所上传的图片
  onCancel?: () => void; // 上传失败时的点击取消回调
  onReselect?: () => void; // 重新上传时的回调
  className?: string;
  imageClassName?: string; // 上传后图片的样式
  src?: string; // 展示图片的src
  style?: CSSProperties;
  shape?: "circle" | "square";
}
const getImageSize = (
  file: RcFile
): Promise<{
  width: number;
  height: number;
}> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function () {
      const image = new Image();
      image.onload = function () {
        const { width, height } = this as HTMLImageElement;
        resolve({ width, height });
      };
      image.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
};
export const dataURLToBlob = async (dataURL: string) => {
  return fetch(dataURL).then((res) => res.blob());
};

export const uploadImage = async (base64: string) => {
  try {
    const blob = await dataURLToBlob(base64);
    const formData = new FormData();
    formData.append("file", blob, "any.png");
    // formData.append('image_type', '2');
    // formData.append('related_id', '14324');
    const res = await fetch("todo", {
      method: "POST",
      body: formData,
      mode: "cors",
      // headers: {
      //   token: TOKEN,
      // },
    }).then((r) => r.json());
    if (res.code === 200 && res.data) {
      // const url = `${S3_PREFIX}/${res.data}`;
      // const url = `${IMAGE_DOWNLOAD}`
      // fetch(url);
      return res.data;
    } else {
      throw Error("network error");
    }
  } catch (e) {
    console.error((e as Error).message);
    return "";
  }
};

export function Uploader(props: UploaderProps) {
  const {
    handleUpload,
    isFileVaild,
    // cropProps,
    needCrop,
    children,
    showImg = true,
    onCancel,
    onReselect,
    className,
    imageClassName,
    style,
    src = "",
    // shape,
  } = props;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openErrorBox, setOpenErrorBox] = useState<boolean>(false);
  const [showCropper, setShowCropper] = useState<boolean>(false);
  const [croppingImg, setCroppingImg] = useState<string>("");
  const [croppingFileName, setCroppingFileName] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string>("");

  // const UploaderIcon = shape === "circle" ? CircleSVG : UploadSVG;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const uploaderRef = useRef<any>(null);

  const beforeUpload: UploadProps["beforeUpload"] = async (file) => {
    if (!isFileVaild) {
      return true;
    }
    const imageSize = await getImageSize(file);
    const errormsg = isFileVaild({ ...imageSize, file });
    if (errormsg) {
      setErrorMessage(errormsg);
      setOpenErrorBox(true);
      return false;
    }
    return true;
  };

  const customRequest: UploadProps["customRequest"] = (options) => {
    const { file } = options;
    let base64: string = "";
    const reader = new FileReader();
    reader.onload = async () => {
      base64 = reader.result as string;
      if (needCrop) {
        setShowCropper(true);
        setCroppingImg(base64);
        setCroppingFileName((file as RcFile).name);
      } else {
        const url = await uploadImage(base64);
        setImgSrc(base64);
        handleUpload?.({
          name: (file as RcFile).name,
          src: url,
          base64,
        });
      }
    };
    reader.readAsDataURL(file as Blob);
    return {
      abort() {
        console.log("upload progress is aborted.");
      },
    };
  };

  const cancelCropping = () => {
    setShowCropper(false);
    setCroppingImg("");
  };

  const applyCropping = async (src: string) => {
    const url = await uploadImage(src);
    setImgSrc(src);
    handleUpload?.({
      name: croppingFileName,
      src: url,
      base64: src,
    });
    cancelCropping();
  };

  const closeErrorBox = () => {
    setOpenErrorBox(false);
    setTimeout(() => {
      setErrorMessage("");
    }, 1000);
  };

  return (
    <div className={className} style={style}>
      {/* @ts-ignore */}
      <Upload
        multiple={false}
        accept="image/*"
        action={"/todo"}
        beforeUpload={beforeUpload}
        headers={{
          "Content-Type": "multipart/form-data",
        }}
        onStart={() => console.log("start")}
        onError={() => console.log("error")}
        onSuccess={() => console.log("success")}
        customRequest={customRequest}
      >
        <div ref={uploaderRef}>
          {(src || imgSrc) && showImg ? (
            <img src={src || imgSrc} className={imageClassName} />
          ) : (
            children || <div>img</div>
          )}
        </div>
      </Upload>

      {/* <Croppers
        defaultImage={croppingImg}
        onCancel={cancelCropping}
        onApply={applyCropping}
        open={Boolean(showCropper && needCrop)}
        {...cropProps}
      />
      {/* 展示上传错误信息 */}
      {/* <Dialog
        open={openErrorBox}
        onClose={closeErrorBox}
        classes={{
          root: "rewrite-dialog-paper",
        }}
      >
        <div className="upload-fail-box">
          <UploadFailedSVG />
          <div>
            <h1>Upload Failed</h1>
            <span>{errorMessage}</span>
          </div>
          <CommonFooter
            onCancel={() => {
              closeErrorBox();
              onCancel?.();
            }}
            onSave={() => {
              closeErrorBox();
              onReselect?.();
              uploaderRef?.current?.click();
            }}
            saveText="Reselect"
            isPrimary={false}
          />
        </div>
      </Dialog> */}
    </div>
  );
}
