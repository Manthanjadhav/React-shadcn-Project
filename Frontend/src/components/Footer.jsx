import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4">
      <div className="flex justify-between">
        <div className="pt-4 pl-4">
          <p>
            &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
          </p>
        </div>
        <div className="pr-4">
          <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
