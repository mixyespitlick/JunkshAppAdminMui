import React from "react";
import { Route } from "react-router-dom";
import AddBid from "./AddBid";
import UpdateBid from "./UpdateBid";
import BidList from "./BidList";

const BidRoute = () => {
    return (
        <div>
            <Route path="/dashboard/bids/create" component={AddBid}></Route>
            <Route
                path="/dashboard/bids/update/:id"
                component={UpdateBid}
            ></Route>
            <Route path="/dashboard/bids" component={BidList} exact></Route>
        </div>
    );
};

export default BidRoute;
