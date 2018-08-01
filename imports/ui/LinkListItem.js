import React from "react";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import Clipboard from "clipboard";
import Moment from "moment";

export default class LinkListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            justCopied: false,
        }
    }
    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);

        this.clipboard.on('success', () => {
            this.setState({
                justCopied: true,
            })
            setTimeout(() => {
                this.setState({
                    justCopied: false,
                })     
            }, 1000);
        }).on('error', () => {
            alert('Unable to copy. Please manually copy the link');
        });
    }
    componentWillUnmount() {
        this.clipboard.destroy();
    }
    renderStats() {
        let visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
        let visitedMessage = null;

        if ( typeof this.props.lastVisitedAt === 'number' ) {
            visitedMessage = `(visited ${ Moment( this.props.lastVisitedAt ).fromNow() })`;
        }
        return <p>{this.props.visitedCount} {visitMessage} {visitedMessage}</p>
    }
    render() {
        return (
            <div className="item">
                <h2>{this.props.url}</h2>
                <div className="item__message">
                    <p>{this.props.shortUrl}</p>
                    { this.renderStats() }
                </div>
                <a href={this.props.shortUrl} className="button button--pill button--link" target="_blank">Visit</a>
                <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
                {this.state.justCopied ? 'Copied' : 'Copy'}
                </button> 
                <button className="button button--pill" onClick={() => {
                    Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
                }}>{ this.props.visible ? 'Hide' : 'Unhide' }</button>
            </div>    
        );
    }
}

LinkListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number
}