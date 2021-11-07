import Api from './api';

export default class PokeApi extends Api {

	static baseUrl = "https://pokeapi.co/api/v2/";

	static async getPokemon(pokemonName: string) {
		
		let res = await this.get(`pokemon/${pokemonName.toLowerCase()}`);
	
		if (res.status != 200)
			return null;
		
		return await res.json();

	}

}