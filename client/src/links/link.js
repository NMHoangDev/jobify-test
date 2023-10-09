import { SiCodefactor } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRankingStar,
} from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "../context/appContext.js";

const links = [
  {
    id: 1,
    path: "/",
    text: "Stats",
    icon: <FontAwesomeIcon icon={faRankingStar} />,
  },
  {
    id: 1,
    path: "/all-jobs",
    text: "All Jobs",
    icon: <FontAwesomeIcon icon={faMagnifyingGlass} />,
  },
  {
    id: 1,
    path: "/add-job",
    text: "Add job",
    icon: <SiCodefactor />,
  },
  {
    id: 1,
    path: "/profile",
    text: "Profile",
    icon: <FaUserCircle />,
  },
];
export default links;
