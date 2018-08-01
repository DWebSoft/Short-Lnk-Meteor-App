import React from 'react'
import { Tracker } from "meteor/tracker";
import { Session } from "meteor/session";

export default class LinkListFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showVisible: false
        }
    }
    componentDidMount() {
        this.filterTracker = Tracker.autorun(() => {
            this.setState({
                showVisible: Session.get('showVisible')
            });
        });
    }
    componentWillUnmount() {
        this.filterTracker.stop();
    }
    render() {
        return (
            <div className="checkbox">
                <input className="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={(e) => {
                    Session.set('showVisible', !e.target.checked)
                }} /> Show hidden Links
            </div>
        )
    }
}