const IMAGE_UPLOAD_URL = "http://localhost:8888";

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
    const res = await fetch(IMAGE_UPLOAD_URL, {
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
