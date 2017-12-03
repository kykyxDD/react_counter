import React from 'react';
import HeaderCounter from './HeaderCounter';
import BodyCounter from './BodyCounter';
import * as data_json_1 from './../data/onair';
import data_json from './../data/_onair.json';
import data_html from './../data/_onair.shtml';
const time_load = 10000;
const time_updateindex = 5000;


const path_url = window.location.href.indexOf('bgoperator') >= 0 ? '/' : './data';//'/pxy-bg';

//var Counter = React.createClass({
class Counter extends React.Component{
	
	downJson(){
		var self = this;
		const src = path_url + '/_onair.json';
		if(path_url.indexOf('pxy-bg') >= 0 ){
			fetch( src, {method: 'get',  mode: 'cors'})
	   		.then(function(response) {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			})
			.then(function(data) {
				self.setState({data_json: data})
			});
		} else {
			self.setState({data_json: data_json})
		}

		
	}
	downHtml(){
		var self = this;
		const url =  path_url + '/_onair.shtml';
		if(path_url.indexOf('pxy-bg') >= 0 ){
			fetch(url, {method: 'get',  mode: 'cors'})
			.then(function(response) {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.text();
			})
	    	.then((data) => {
	    		//console.log('data_html:',data)
	    		self.setState({data_html: data})
	   		})
   		} else {
   			self.setState({data_html: data_html})
   		}
	}

	updateIndex(){
		const l = document.querySelectorAll('.contCounter .item_counter').length;
		const new_index = (this.state.index + 1)%l;
		//console.log('new_index', new_index)
		this.setState({index: new_index ? new_index : 0})
	}
	toggleLiked(){
		console.log('toggleLiked');
		var date = new Date();
		this.downJson();
		//this.downHtml();
	}
	getInitState(){
		var self = this;

		setInterval(function(){
			//self.toggleLiked()
		},time_load)
		setInterval(function(){
			self.updateIndex()
		},time_updateindex);
		//this.downJson();
		//this.downHtml();

		
	}


	constructor(props) {
		super(props);
		this.getInitState();
		const data_0 = data_json_1.data_0;
		this.state = {
			data_json: data_0.json,  //{},
			data_html: new DOMParser().parseFromString(data_0.html, 'text/html') , //;// data_0.html,
			index: 0
		};
	}
	render(){
		console.log(this.state)
		return (
			<div className='cont_counter'>
				<HeaderCounter date={this.state.data_json.date} />
				<BodyCounter 
					data_json={this.state.data_json} 
					data_html={this.state.data_html} 
					index={this.state.index}/>
			</div>
		)
	}
};

export default Counter;