import React, { Component } from 'react';

export default class Controller extends Component {

  handleSelect = (e) => {
    this.props.setPurpose(e.target.value);
  }

  handleSubmit = (e) => {
    e.preventDefault();

  }

  makeCategoryOptions = (purpose) => {
    return <option key={purpose.id} value={purpose.id}>{this.formatName(purpose.category)}</option>
  }

  formatName = (str) => {
    return str ? (str.charAt(0).toUpperCase() + str.slice(1)).replace(/_/, ' ') : '';
  }

  render() {
    return (
      <div className="controller">
        <form onSubmit={this.handleSubmit}>
          <label>pick a category:</label>
          <select name="categories" onChange={this.handleSelect} >
            {this.props.appState.allPurposes.map(this.makeCategoryOptions)}
          </select>
        </form>
      </div>
    )
  }
} // end class Controller
