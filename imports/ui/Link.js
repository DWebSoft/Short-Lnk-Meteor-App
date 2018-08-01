import React from "react";
import LinkList from "./LinkList";
import PrivateHeader from "./PrivateHeader";
import AddLink from "./AddLink";
import LinkListFilter from "./LinkListFilter";

//Stateless functional component
export default () => {
    return (
        <div>
            <PrivateHeader title="Short Lnk"/>
            <div className="page-content">
                <LinkListFilter />
                <AddLink />
                <LinkList />
            </div> 
        </div>
    )
}
