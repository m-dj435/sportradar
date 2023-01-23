import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

const Navbar = () => (
  <nav className="bg-gray-100 shadow sticky z-10 top-0">
    <div className="container flex items-center justify-center p-6 mx-auto">
      <Icon name="soccer" size="big" />
      <Link
        to="/"
        className="text-black border-b-2 border-green-500 mx-1.5 sm:mx-6 text-xl  visited:text-black"
      >
        Home
      </Link>
    </div>
  </nav>
);

export default Navbar;
