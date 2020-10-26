import { AccountBox, Gavel, PostAdd, Home } from "@material-ui/icons";
import UserList from "../components/user/UserList";
import PostList from "../components/post/PostList";
import BidList from "../components/bid/BidList";
import HomePage from "../components/home/HomePage";
import UserRoute from "../components/user/UserRoute";
import PostRoute from "../components/post/PostRoute";
import BidRoute from "../components/bid/BidRoute";

export const routeList = [
    {
        icon: Home,
        label: "Home",
        path: "/home",

        template: "dashboard",
        component: HomePage,
    },
    {
        icon: AccountBox,
        label: "Users",
        path: "/users",

        template: "dashboard",
        component: UserRoute,
    },
    {
        icon: PostAdd,
        label: "Posts",
        path: "/posts",

        template: "dashboard",
        component: PostRoute,
    },
    {
        icon: Gavel,
        label: "Bids",
        path: "/bids",

        template: "dashboard",
        component: BidRoute,
    },
];
