import React, {Component} from 'react';

const timezones = ['PST', 'MST', 'MDT', 'EST', 'UTC'];

class TimeForm extends Component{
    constructor(props){
        super(props);

        const {tz, msg} = this.props;
        this.state = {tz, msg};
    }

    _handleChange(evt){
        typeof this.props.onFormChange === 'function' &&
                this.props.onFormChange(this.state);
    }

    _changeTimeZone(evt){
        const tz = evt.target.value;
        this.setState({tz}, this._handleChange);
    }

    _changeMsg(evt){
        const msg = encodeURIComponent(evt.target.value).replace(/%20/, '+');
        this.setState({msg}, this._handleChange);
    }

    _handleFormSubmit(evt){
        evt.preventDefault();
        typeof this.props.onFormSubmit === 'function' &&
               this.props.onFormSubmit(this.state);
    }

    render() {
        const {tz} = this.state;

        return (
            <form onSubmit={this._handleFormSubmit.bind(this)}>
                <select
                    onChange={this._changeTimeZone.bind(this)}
                    defaultValue={tz}>
                {timezones.map(t => {
                    return (<option key={t} value={t}>{t}</option>)
                })}
                </select>
                <input
                    type="text"
                    placeholder="A chronic String message"
                    onChange={this._changeMsg.bind(this)}>
                </input>
                <input
                    type="submit"
                    value="Actualizar petición"
                ></input>
            </form>
        );
    }
}

export default TimeForm;