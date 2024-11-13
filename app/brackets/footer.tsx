import React from 'react';
import Image from 'next/image';
import GitHub from '../images/github-mark-white.png';
import Link from '../images/LI-In-Bug.png';
import './footer.css';

const Footer = () => {
  return (
    <div className="foot-container flex items-center justify-center py-2 ">
      {/* Copyright Text */}
      <p className="text-xs">Copyright &copy; 2024 New Jersey Institute of Technology, Jerry Arguello</p>

      {/* Social Icons */}
      <div className="icons flex items-center gap-7 mx-5">
        <a href='https://github.com/ProjectJerryLucasArguello'target="_blank" rel="noopener noreferrer">
            <Image src={GitHub} alt="GitHub to Creator" className="w-5 h-5" />
        </a>

        <a href='https://www.linkedin.com/in/jerry-arguello-a6ba35313'target="_blank" rel="noopener noreferrer">
            <Image src={Link} alt="LinkedIn to Creator" className="w-5 h-5" />
        </a>
      </div>

    </div>
  );
};

export default Footer;
