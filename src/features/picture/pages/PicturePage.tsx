import { useParams } from "react-router-dom";
import { type PathParams, ROUTES } from "../../../shared/routes/routes.ts";

function PicturePage() {
  const params = useParams<PathParams[typeof ROUTES.PICTURE]>();
  return <div>Picture page {params.pictureId}</div>;
}

export const Component = PicturePage;
