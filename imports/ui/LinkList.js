import React from "react";
import { Tracker } from "meteor/tracker";
import { Links } from "./../api/links";
import { Meteor } from "meteor/meteor";
import LinkListItem from "./LinkListItem";
import { Session } from "meteor/session";
import FlipMove from 'react-flip-move';


export default class LinkList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            links: []
        }
    }
    renderLinkListItems() {

        if (this.state.links.length === 0) {
            return (
                <div className="item">
                    <p className="item__status-message">No Links Found</p>
                </div>
            );
        }

        return this.state.links.map((link) => {
            let shortUrl = Meteor.absoluteUrl(link._id);
            return <LinkListItem key={link._id} shortUrl={shortUrl} {...link}/>
        });
    }
    componentDidMount(){
        console.log('componentDidMount LinkList');

        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links');
            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState({links});
        });
    }
    
    componentWillUnmount() {
        console.log('componentWillUnmount LinkList');
        this.linksTracker.stop();
    }
    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderLinkListItems()}
                </FlipMove>
            </div>    
        );
    }
}