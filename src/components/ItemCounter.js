import React from 'react';
//import Switch, {Case, Default} from 'react-switch-case';
import ElemTitle from './ElemTitle';
import ListInfo from './ListInfo';

const obj_num = 0;
const timeAnimation = 3000;
var animation = false;
const last_call_time = Date.now();

function getNumSpace(num){
	num = (typeof num == 'number') ? '' + num : num;
	var arr = [];
	var new_num = '';
	if(num.length > 3){
		var pre = num.length%3;
		var arr = [];
		if(pre > 0){ arr.push(num.slice(0, pre)); }
		for(var i = pre; i < num.length; i += 3){
			arr.push(num.slice(i, i+3));
		}
		new_num = arr.join(' ');
	} else {
		new_num = num
	}
	return new_num
}

export default class ItemCounter extends React.Component {

	constructor(props){
		super(props);
		this.state = props.data;
	}

	componentWillReceiveProps(props){
		this.interval = false;

		if(props.data.count != this.state.count){
			//console.log(props.data.key, 'props: ', props.data.count, 'state:', this.state.count)
		}

		if(props.data.count != this.state.count && props.item_vis){
			var obj = this.getParams(props, this.state);
			if(Math.abs(obj.diff) == 1 ){
				this.setState({ "count": props.data.count})
				this.forceUpdate();	
			} else {
				animation = requestAnimationFrame(this.tick.bind(this,obj));
			}
		} else {
			this.setState({ "count": props.data.count})
			this.forceUpdate();
		}
	}
	getParams(props, state){
		var diff = props.data.count - state.count;
		let start_num = state.count
		if(diff > 100 ){
			start_num = props.data.count - 100
			this.setState({ "count": start_num })
			this.forceUpdate();

			diff = 100;
		}
		const k = diff/timeAnimation
		const time_start = Date.now();
		const num_interval = Math.ceil(k);
		const index = diff > 0 ? 1 : -1;
		return {
			time_start,
			start_num,
			num: start_num,
			diff,
			index,
			key: props.data.key, 
			k
		}
	}

	tick(obj){
		if(maxNum == obj.num) return
		var time_now  = Date.now();
		var time_dist = time_now - obj.time_start;
		var d = (time_dist/timeAnimation);
		const maxNum = this.props.data.count;
		d = d < 1 ? d : 1;

		var path_num  = (obj.num-obj.start_num)/obj.diff;
		var path_dist = 1*obj.diff ;
		var num_sum   = (path_dist-path_num*path_dist)*d;

		obj.num = +obj.num + num_sum;
		obj.num = +obj.num.toFixed(0);
		//console.log(obj.key, 'state:', obj.num, 'props:', maxNum)

		if(d < 1){
			if(obj.index > 0 && obj.num > maxNum){
				obj.num = maxNum
			} else if(obj.index < 0 && obj.num < maxNum ){
				obj.num = maxNum
			}
		} else {
			obj.num = maxNum
		}

		if( obj.index < 0 && obj.num >= maxNum ){
			this.setState({ "count": obj.num })
			this.forceUpdate();
			if(obj.num !== maxNum) {
				animation = requestAnimationFrame(this.tick.bind(this, obj))
			} else {
				cancelAnimationFrame(animation)
			}
		} else if(obj.index > 0 && obj.num <= maxNum){
			this.setState({ "count": obj.num })
			this.forceUpdate();
			if(obj.num !== maxNum) {
				animation = requestAnimationFrame(this.tick.bind(this, obj))
			} else {
				cancelAnimationFrame(animation)
			}
		} else {
			cancelAnimationFrame(animation)
		}
	}

	render() {

		const num = this.props.item_vis ? this.state.count : this.props.data.count //this.state.count


		return (
			<div className={'item_counter ' + this.props.data.key} style={this.props.styles}>
				<div className='big_counter' > 
					<ElemTitle data={this.props.data.key} />
					<div className='value_counter'><span className='num'>{getNumSpace(num)}</span> чел </div>
				</div>
				<div className='list_counter'> 
					<ListInfo data={this.props.data} />
				</div>

			</div>
		);
	}
};