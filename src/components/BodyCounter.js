import React from 'react';
import ItemCounter from './ItemCounter';

const arr_ind_w = [
	[0, -1 ,-2, 2, 1],
	[1, 0, -1 ,-2, 2],
	[2, 1, 0, -1 ,-2],
	[-2, 2, 1, 0, -1],
	[-1, -2, 2, 1, 0]
];

function parseJson(json){

	var data = {
		'rest': {
			'count': 0,
			'key': 'rest'
		},
		'flies': {
			'count': 0,
			'key': 'flies'
		},
		'book': {
			'count': 0,
			'key': 'book'
		}
	};
	var arr_data = [];

	for(var key in json){
		var arr_key = key.split('.');
		if(!data[arr_key[0]]) {
			if(arr_key[1]) {
				data[arr_key[0]] = {};
				data[arr_key[0]].key = arr_key[0];
			} else {
				data[arr_key[0]] = '';
			}
		} 
		if(arr_key[1]){
			data[arr_key[0]][arr_key[1]] = json[key];
			if(arr_key[1] == 'count') {
				data[arr_key[0]][arr_key[1]] = +json[key].split(' ')[0];
			}
		} else {
			data[arr_key[0]] = json[key];
		}
	}

	return {
		data : data,
		arr  : data['rest'] ? [
			data['rest'],
			data['flies'],
			data['book']
		] : []
	}
}
function parseHTML(html){
	let div = document.createElement('div');
	if(typeof html == 'string'){
		div.innerHTML = html;
	} else {
		div = html
	}
	

	const exc_count = div.querySelector('[data-indexstats="exc.count,b"]');
	const exc_countries = div.querySelector('[data-indexstats="exc.countries,b"]');
	const tkt_count = div.querySelector('[data-indexstats="tkt.count,b"]');
	const tkt_flights = div.querySelector('[data-indexstats="tkt.flights,b"]');
	const tkt_countries = div.querySelector('[data-indexstats="tkt.countries,b"]');
	const exc = {
		count: exc_count ? +exc_count.innerText.split(' ')[0] : 0 ,
		countries: exc_countries ? exc_countries.innerText : '' ,
		key: 'exc'
	};
	const tkt = {
		count: tkt_count ? +tkt_count.innerText.split(' ')[0] : 0,
		flights: tkt_flights ? tkt_flights.innerText : '',
		countries: tkt_countries ? tkt_countries.innerText : '',
		key: 'tkt'
	};
	console.log(exc, tkt)
	return [ exc, tkt ]
}

function setStyles(arr, obj, i, props_index){
	const elem = document.querySelector('#counter');
	const w = elem.clientWidth > 500 ? 333 : elem.clientWidth;
	const new_index = arr_ind_w[props_index][i];

	var styles = {
		transform: 'translate('+new_index*w+'px , 0px)',
		zIndex: Math.abs(new_index) == 0 ? 1 : 0,
		opacity: Math.abs(new_index) > 1 ? 0 : 1
	};

	return styles
}

function Body(props){
	const data_json = parseJson(props.data_json);
	const data_html = parseHTML(props.data_html);
	const arr = data_json.arr.concat(data_html);

	return (
		<div className='contCounter'> 
			{arr.map(function(obj, i){
				const styles = setStyles(arr, obj, i, props.index);
				return <ItemCounter data={obj} key={obj.key} item_vis={props.index == i} styles={styles}/>
			})}
		</div>
	)
}



export default Body;