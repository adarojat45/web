import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
} from "next-share";

const BASE_URL = "https://ajatdarojat45.id";

function SocialShare({ data }) {
  return (
    <>
      <FacebookShareButton
        url={`${BASE_URL}/${data?.slug}`}
        quote={data?.name}
        hashtag={"#nextshare"}
      >
        <FacebookIcon size={32} round className="mx-1" />
      </FacebookShareButton>
      <TwitterShareButton url={`${BASE_URL}/${data?.slug}`} title={data?.name}>
        <TwitterIcon size={32} round className="mx-1" />
      </TwitterShareButton>
      <LinkedinShareButton url={`${BASE_URL}/${data?.slug}`}>
        <LinkedinIcon size={32} round className="mx-1" />
      </LinkedinShareButton>
      <WhatsappShareButton
        url={`${BASE_URL}/${data?.slug}`}
        title={data?.name}
        separator=":: "
      >
        <WhatsappIcon size={32} round className="mx-1" />
      </WhatsappShareButton>
      <TelegramShareButton url={`${BASE_URL}/${data?.slug}`} title={data?.name}>
        <TelegramIcon size={32} round className="mx-1" />
      </TelegramShareButton>
    </>
  );
}

export default SocialShare;
