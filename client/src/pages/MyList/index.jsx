import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import MyListItems from "./MyListItems";
import AccountSidebar from "../../components/AccountSidebar";
import { MyContest } from "../../App";

const MyList = () => {
  const { wishlist } = useContext(MyContest);

  return (
    <section className="py-10 w-full">
      <div className="container flex flex-col lg:flex-row gap-5">
        <div className="col1 w-full lg:w-[20%]">
          <AccountSidebar />
        </div>

        <div className="col2 w-full lg:w-[75%]">
          <div className="shadow-md rounded-md bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
              <h2>My List</h2>
              <p className="mt-0">
                There {wishlist.length === 1 ? "is" : "are"}{" "}
                <span className="font-bold text-primary">{wishlist.length}</span>{" "}
                {wishlist.length === 1 ? "product" : "products"} in My List
              </p>
            </div>

            {wishlist.length === 0 ? (
              <div className="p-8 text-center">
                <p>Your list is empty. Tap the heart on any product to save it here.</p>
                <Link to="/ProductListing">
                  <Button className="btn-org">Browse products</Button>
                </Link>
              </div>
            ) : (
              wishlist.map((w) => <MyListItems key={w._id} product={w.productId} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyList;
