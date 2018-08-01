import React from "react";
import { Meteor } from "meteor/meteor";
import Modal from "react-modal";

Modal.setAppElement('#app');
//Controlled Input example
export default class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            isModalOpen: false,
            error: ''
        }
    }
    onSubmit(e) {
        e.preventDefault();
        let url = this.state.url.trim();
        
        Meteor.call('links.insert', url, (err, res) => {
            if (!err) {
                this.handleModalClose();
            } else {
                this.setState({ error: err.reason });
            }
        });
       
    }
    onChange(e) {
       this.setState({
           url: e.target.value
       }); 
    }
    handleModalClose() {
        this.setState({ 
            url: '', 
            isModalOpen: false, 
            error: ''
        });
    }
    render() {
        return (
            <div>
                <button className="button" onClick={() => {this.setState({isModalOpen: true})}}>Add Link</button>
                <Modal 
                    isOpen={this.state.isModalOpen}
                    contentLabel="Add Link"
                    onAfterOpen={() => { this.refs.url.focus() }}
                    onRequestClose={this.handleModalClose.bind(this)}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                    >
                    <h1>Add Link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined }
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input
                            type="text"
                            name="url"
                            placeholder="URL"
                            ref="url"
                            value={this.state.url}
                            onChange={this.onChange.bind(this)}
                        />
                        <button className="button">Add Link</button>
                        <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Close</button>
                    </form> 
                </Modal> 
            </div>
        );
    }
}
