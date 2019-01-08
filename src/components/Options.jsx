import React, { Component } from 'react';
import './Options.css';

class Options extends Component {

	constructor(props) {
		super(props);
		this.state = {
			band: 'round',
			metal: 'gold',
			polish: 'glossy',
			bandWidth: 1,
			diamondSize: 1,
			selectedOption: 'band'
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleOptionButtonClick = this.handleOptionButtonClick.bind(this);
	}

	handleInputChange(event) {
		const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

		let change = { [event.target.name]: value };
		this.setState(change, function(){
			this.props.onChange(change);
		});
	}

	handleOptionButtonClick(event) {
		this.setState({ selectedOption: event.target.getAttribute('data-select') });
	}

	render() {
		return (
			<div id="Options">
				<ul>
					<li><button onClick={this.handleOptionButtonClick} data-select="band" className={ this.state.selectedOption === "band" ? 'open' : '' }>Band Style</button></li>
					<li><button onClick={this.handleOptionButtonClick} data-select="metal" className={ this.state.selectedOption === "metal" ? 'open' : '' }>Metal</button></li>
					<li><button onClick={this.handleOptionButtonClick} data-select="polish" className={ this.state.selectedOption === "polish" ? 'open' : '' }>Polish</button></li>
					<li><button onClick={this.handleOptionButtonClick} data-select="bandWidth" className={ this.state.selectedOption === "bandWidth" ? 'open' : '' }>Band Width</button></li>
					<li><button onClick={this.handleOptionButtonClick} data-select="diamondSize" className={ this.state.selectedOption === "diamondSize" ? 'open' : '' }>Diamond Size</button></li>
				</ul>

				<form onChange={this.handleInputChange}>
					<fieldset className={ this.state.selectedOption === "band" ? 'open' : '' }>
						<legend>Band Style</legend>
						<div className="option-select">
							<label><input type="radio" name="band" value="round" checked={this.state.band === "round"} /> Round</label>
							<label><input type="radio" name="band" value="pave" checked={this.state.band === "pave"} /> Pave</label>
							<label><input type="radio" name="band" value="twisted" checked={this.state.band === "twisted"} /> Twisted</label>
						</div>
					</fieldset>

					<fieldset className={ this.state.selectedOption === "metal" ? 'open' : '' }>
						<legend>Metal</legend>
						<div className="option-select">
							<label><input type="radio" name="metal" value="gold" checked={this.state.metal === "gold"} />Gold</label>
							<label><input type="radio" name="metal" value="silver" checked={this.state.metal === "silver"} />Silver</label>
							<label><input type="radio" name="metal" value="chrome" checked={this.state.metal === "chrome"} />Chrome</label>
						</div>
					</fieldset>

					
					<fieldset className={ this.state.selectedOption === "polish" ? 'open' : '' }>
						<legend>Polish</legend>
						<div className="option-select">
							<label><input type="radio" name="polish" value="glossy" checked={this.state.polish === "glossy"} />Glossy</label>
							<label><input type="radio" name="polish" value="matte" checked={this.state.polish === "matte"} />Matte</label>
						</div>
					</fieldset>

					<fieldset className={ this.state.selectedOption === "bandWidth" ? 'open' : '' }>
						<legend>Band Width (cm)</legend>
						<div className="option-select">
							<input type="range" name="bandWidth" min="0.5" max="1.5" step="0.5" value={this.state.bandWidth} />
							<div className="slider-value">{this.state.bandWidth}</div>
						</div>
					</fieldset>

					<fieldset className={ this.state.selectedOption === "diamondSize" ? 'open' : '' }>
						<legend>Diamond Size (cm)</legend>
						<div className="option-select">
							<input type="range" name="diamondSize" min="0.5" max="1.5" step="0.5" value={this.state.diamondSize} />
							<div className="slider-value">{this.state.diamondSize}</div>
						</div>
					</fieldset>
				</form>
			</div>
		);
	}
}

export default Options;
