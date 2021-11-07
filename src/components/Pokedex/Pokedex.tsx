import React, { Component } from 'react';
import './Pokedex.css';
import { debounce } from 'lodash';
import PokeApi from '../../services/pokeapi';
import { slugToText, stringToTitle } from '../../utils';

interface Props {
	
}
interface State {
	online: boolean;
	pokemonId: number;
	pokemon: string;
	pokemonImage: string,
	description: string;
}

interface Pokemon {
	id: number,
	name: string,
	sprites: any,
	stats: any,
	types: any,
	moves: any
}

export default class Pokedex extends Component<Props, State> {
	state = {
		online: false,
		pokemonId: 0,
		pokemon: "",
		pokemonImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png",
		description: ""
	}

	_onPokemonNameChange = debounce(this.onPokemonNameChanged, 1000);

	constructor(props: Props, state: State) {
		super(props, state);

		this.onPowerButtonClicked = this.onPowerButtonClicked.bind(this);
		this.onPokemonNameChange = this.onPokemonNameChange.bind(this);
		this.onPokemonNameChanged = this.onPokemonNameChanged.bind(this);
	}

	onPowerButtonClicked(e: any) {
		this.setState({online: !this.state.online});
	}

	buildPokemonDescription(pokemon: Pokemon) : string{
		let description: string[] = new Array();

		console.log({pokemon});

		description.push("<b>Type:</b> ");
		pokemon.types.forEach((pokeType: any) => {
			description.push(pokeType.type.name);
			description.push("/");
		});
		description.pop();
		description.push("\n\n");

		pokemon.stats.forEach((stat: any) => {
			description.push("<b>");
			description.push(slugToText(stat.stat.name));
			description.push("</b>");
			description.push(": " + stat.base_stat);
			description.push("\n");
		});

		description.push("\n\n");

		description.push("<b>Possible moves:</b>\n");
		pokemon.moves.forEach((move: any) => {

			description.push( slugToText(move.move.name) )
			description.push("\n")

		});
		description.pop();

		return description.join("");
	}

	async onPokemonNameChanged() {

		if (this.state.pokemon.length < 2)
			return;
		
		let pokemon = await PokeApi.getPokemon(this.state.pokemon);

		if (pokemon == null)
			return;

		this.setState({
			pokemonId: pokemon.id,
			pokemonImage: pokemon.sprites.front_default,
			description: this.buildPokemonDescription(pokemon)
		})
	}

	onPokemonNameChange(e: any) {
		this.setState({pokemon: e.target.value});
		this._onPokemonNameChange();
	}

	render() {
		return (
			<div className="pokedex">
					<div className={ "pokedex-power-button " + (this.state.online ? "pokedex-power-button-on" : "") } onClick={this.onPowerButtonClicked}></div>
					<div className={ "pokedex-display " + (this.state.online ? "pokedex-display-on" : "") }>

						{this.state.online && <>
							<div className="pokedex-display-header">
								<div className="InputAddOn">
									<span className="pokedex-display-title-id InputAddOn-item">#{this.state.pokemonId}</span>
									<input placeholder="Put the pokemon name here" className="pokedex-display-title InputAddOn-field" onInput={this.onPokemonNameChange} spellCheck="false" value={this.state.pokemon}></input>
								</div>
								<img className="pokedex-display-image" src={this.state.pokemonImage} alt="Pokemon representation"></img>
							</div>
							<div className="pokedex-display-content">
								<p dangerouslySetInnerHTML={ {__html: this.state.description} }></p>
							</div>
						</>}

					</div>
			</div>
		)
	}
}
