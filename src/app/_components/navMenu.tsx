import Link from "next/link";
import { Badge } from "~/components/ui/badge";

const NavMenu = () => {
  const routingLinks = [
    { label: "Movies", link: "/" },
    { label: "TV Shows", link: "/shows" },
    { label: "myList", link: "/myList" },
  ];
  return (
    <div>
      {routingLinks.map((link) => (
        <Link href={link.link} className="text-white" key={link.label}>
          <Badge variant={"outline"} className="px-5 py-2">
            {link.label}
          </Badge>
        </Link>
      ))}
    </div>
  );
};

export default NavMenu;
