import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { useState, useRef, useEffect } from "react";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}
const ImageCropper = ({
  isCropperOpen,
  setIsCropperOpen,
  imageSrc,
  setImgSrc,
}) => {
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 50,
    aspect: 9 / 16, // Default aspect ratio
  });
  console.log("new crop", crop);
  const [completedCrop, setCompletedCrop] = useState();

  function onImageLoad(e) {
    if (crop.aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, crop.aspect));
    }
  }

  const handleAspectChange = (e) => {
    const value = e.target.value;
    let aspectRatio;

    switch (value) {
      case "16/9":
        aspectRatio = 9 / 16;
        break;
      case "4/3":
        aspectRatio = 3 / 4;
        break;
      case "1/1":
      default:
        aspectRatio = 1;
        break;
    }
    console.log("seee", aspectRatio);
    setCrop((prevCrop) => ({
      ...prevCrop,
      aspect: aspectRatio,
    }));
  };

  const cropImageNow = async () => {
    setIsCropperOpen(false);

    if (
      completedCrop &&
      imgRef.current &&
      completedCrop.width &&
      completedCrop.height
    ) {
      const canvas = document.createElement("canvas");
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      const pixelRatio = window.devicePixelRatio;

      canvas.width = completedCrop.width * pixelRatio;
      canvas.height = completedCrop.height * pixelRatio;
      const ctx = canvas.getContext("2d");
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        imgRef.current,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width * pixelRatio,
        completedCrop.height * pixelRatio
      );

      // Access the cropped image data from the canvas
      const croppedImageData = canvas.toDataURL("image/jpeg");

      console.log(croppedImageData);
      // Convert the data URL to a Blob
      canvas.toBlob(async (blob) => {
        // Handle the Blob here
        console.log(blob);
        const uploadConfig = await axios.get("http://localhost:9009/upload");
        console.log("uploadConfig", uploadConfig);

        try {
          const resp = await axios.put(uploadConfig.data.url, blob, {
            headers: {
              "Content-Type": blob.type,
            },
          });
          console.log("resp--->", resp.status);

          setImgSrc(
            `https://nodequorumclub.s3.amazonaws.com/${uploadConfig.data.key}`
          );
        } catch (err) {
          console.log("err", err);
        }
      }, "image/jpeg");
    }
  };

  return (
    <Dialog
      open={isCropperOpen}
      fullWidth={true}
      maxWidth="md"
      onClose={() => {
        setIsCropperOpen((s) => !s);
      }}
    >
      <DialogTitle>Image Cropper</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid md={12}>
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              keepSelection={true}
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imageSrc}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <FormControl>
          <RadioGroup row onChange={handleAspectChange}>
            <FormControlLabel
              value="16/9"
              label="16/9"
              labelPlacement="end"
              control={<Radio size="large" />}
            />
            <FormControlLabel
              value="4/3"
              label="4/3"
              labelPlacement="end"
              control={<Radio size="large" />}
            />
            <FormControlLabel
              value="1/1"
              label="1/1"
              labelPlacement="end"
              control={<Radio size="large" />}
            />
          </RadioGroup>
        </FormControl>
        <Button variant="contained" onClick={cropImageNow}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ImageCropper;
