/**
 * React app side menu structure
 */
import reactIcon from "../assets/images/react-grey.svg";
import reactActiveIcon from "../assets/images/react-green.svg";
import homeIcon from "../assets/images/home.svg";
import homeActiveIcon from "../assets/images/home-green.svg";
import myWorkIcon from "../assets/images/my-work.svg";
import myWorkActiveIcon from "../assets/images/my-work-green.svg";
import findWorkIcon from "../assets/images/find-work.svg";
import findWorkActiveIcon from "../assets/images/find-work-green.svg";

const appMenu = [
  {
    title: "Find Work",
    path: "/earn/find",
    icon: findWorkIcon,
    activeIcon: findWorkActiveIcon,
  },
  {
    title: "No Sidebar Demo",
    path: "/earn/no-sidebar",
    icon: homeIcon,
    activeIcon: homeActiveIcon,
  },
  {
    title: "Challenges",
    path: "/earn/find/challenges",
    icon: homeIcon,
    activeIcon: homeActiveIcon,
  },
  {
    title: "Filter",
    path: "/earn/find/filter",
    icon: homeIcon,
    activeIcon: homeActiveIcon,
  },
];

export default appMenu;
