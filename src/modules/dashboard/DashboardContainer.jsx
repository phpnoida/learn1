import { Box, Card, CardContent, Paper, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useRef, useState } from "react";
import axios from "axios";
import ImageCropper from "../../components/modals/ImageCropper";

const DashboardContainer = () => {
  const fileRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [loader, setLoader] = useState(false);
  const [pic, setPic] = useState("");

  const [isCropperOpen, setIsCropperOpen] = useState(false);

  const imageHandler1 = async (e) => {
    console.log("file---", e.target.files[0]);
    //setImgSrc("");
    setLoader(true);

    const uploadConfig = await axios.get("http://localhost:9009/upload");
    console.log("uploadConfig", uploadConfig);

    try {
      const resp = await axios.put(uploadConfig.data.url, e.target.files[0], {
        headers: {
          "Content-Type": e.target.files[0].type,
        },
      });
      console.log("resp--->", resp.status);
      setPic(uploadConfig.data.key);
      setLoader(false);
      setImgSrc(
        `https://nodequorumclub.s3.amazonaws.com/${uploadConfig.data.key}`
      );
    } catch (err) {
      console.log("err", err);
    }
  };

  const imageHandler2 = (e) => {
    console.log("new one", e.target.files[0]);
    console.log(URL.createObjectURL(e.target.files[0]));
    setImgSrc(URL.createObjectURL(e.target.files[0]));
    setIsCropperOpen(true)
  };

  return (
    <Grid2 container spacing={4}>
      <ImageCropper
        isCropperOpen={isCropperOpen}
        setIsCropperOpen={setIsCropperOpen}
        imageSrc={imgSrc}
        setImgSrc={setImgSrc}
      />
      <Grid2 item md={2}>
        <Box
          sx={{ width: "120px", height: "150px", cursor: "pointer" }}
          onClick={() => {
            fileRef.current.click();
          }}
        >
          {loader ? (
            <h2>Uploading...</h2>
          ) : (
            <img
              src={
                imgSrc
                  ? imgSrc
                  : "https://cdn.vectorstock.com/i/preview-1x/62/59/default-avatar-photo-placeholder-profile-icon-vector-21666259.webp"
              }
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
          <input
            ref={fileRef}
            type="file"
            name="pic"
            accept="image/*"
            hidden
            onChange={imageHandler2}
          />
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default DashboardContainer;
