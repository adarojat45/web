import { SocialIcon } from "react-social-icons";

const styles = {
  height: 40,
  width: 40,
  marginRight: 5,
};

function SocialMedia() {
  return (
    <>
      <SocialIcon url="https://youtube.com/ajatdarojat45" style={styles} />
      <SocialIcon url="https://linkedin.com/in/ajatdarojat45" style={styles} />
      <SocialIcon url="https://github.com/ajatdarojat45" style={styles} />
      <SocialIcon url="https://instagram.com/ajatdarojat45" style={styles} />
    </>
  );
}

export default SocialMedia;
