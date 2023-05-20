import { useEffect, useState } from "react";
import { useAppSelector } from "../state/hooks";

interface ImageViewProps {
  imageUrl: string
}

export function ImageView(props: ImageViewProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loadingStatus, setLoadingStatus] = useState<string>("Loading image");
  const token = useAppSelector((state) => {
    return state.token.token;
  });

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(props.imageUrl, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (response.ok) {
          const blob = await response.blob();
          setImageUrl(URL.createObjectURL(blob));
        } else {
          setLoadingStatus("Error while loading image")
        }
      } catch (error) {
        setLoadingStatus("Error while loading image");
      }
    };

    fetchImage();
  }, [props.imageUrl]);
  return (
    <div>
      <img
        src={imageUrl}
        alt={loadingStatus}
        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
      />
    </div>
  );
}