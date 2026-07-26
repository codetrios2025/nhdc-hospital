import { InstagramEmbed } from "react-social-media-embed";

const InstaVideo = ({data}) => {
  
  return (
   
      <div className="instagramContainer">
      <InstagramEmbed
        url={data}
      />
    </div>
  );
}
export default InstaVideo;