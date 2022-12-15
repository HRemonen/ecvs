import { Link } from "react-router-dom";

type LinkItemContent = { content: string; to: string };

const NavItem = ({ content, to }: LinkItemContent) => (
  <li className="p-4">
    <Link to={ to }>{ content }</Link>
  </li>
);

export default NavItem;