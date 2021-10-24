import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { SocialIcon } from "react-social-icons";

const styles = {
  height: 40,
  width: 40,
  marginRight: 5,
};

const BASE_URL = "https://ajatdarojat45.id";

function SocialShare({ data }) {
  return (
    <>
      <FacebookShareButton url={`${BASE_URL}/${data.slug}`}>
        <SocialIcon network="facebook" style={styles} />
      </FacebookShareButton>
      <TwitterShareButton
        url={`${BASE_URL}/${data.slug}`}
        title={data.name}
        hashtags={data.tags}
      >
        <SocialIcon network="twitter" style={styles} />
      </TwitterShareButton>
      <LinkedinShareButton
        url={`${BASE_URL}/${data.slug}`}
        title={data.name}
        source={BASE_URL}
      >
        <SocialIcon network="linkedin" style={styles} />
      </LinkedinShareButton>
      <WhatsappShareButton
        url={`${BASE_URL}/${data.slug}`}
        title={data.name}
        separator={"\n\n"}
      >
        <SocialIcon network="whatsapp" style={styles} />
      </WhatsappShareButton>
      <TelegramShareButton url={`${BASE_URL}/${data.slug}`} title={data.name}>
        <SocialIcon network="telegram" style={styles} />
      </TelegramShareButton>
    </>
  );
}

export default SocialShare;
