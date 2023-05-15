interface ImageViewProps {
  imageUrl: string
}

export function ImageView(props: ImageViewProps) {
  return (
    <div>
      <img
        src={props.imageUrl}
        alt="Image not loaded"
        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
      />
    </div>
  );
}