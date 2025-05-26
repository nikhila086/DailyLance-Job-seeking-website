import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin , FaGithub} from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Nikhila Pediredla.</div>
      <div>
        
        <Link to={"https://www.linkedin.com/in/nikhila-pediredla-14387926b"} target="_blank">
          <FaLinkedin />
        </Link>

        <Link to={"https://github.com/nikhila086"} target="_blank">
          <FaGithub />
        </Link>
        
      </div>
    </footer>
  );
};

export default Footer;
