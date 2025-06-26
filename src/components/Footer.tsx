import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-700 inset-shadow-sm text-center w-full p-4">
      &#169;{new Date().getFullYear()} All rights reserved | Built with ❤ by
      Duke
    </footer>
  );
};

export default Footer;
