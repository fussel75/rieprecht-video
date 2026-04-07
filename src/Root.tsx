import { Composition } from "remotion";
import { RieprechtVideo } from "./Video";

export const Root: React.FC = () => {
  return (
    <Composition
      id="RieprechtVideo"
      component={RieprechtVideo}
      durationInFrames={990}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
