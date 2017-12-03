import React from 'react';

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

export default function ListInfo(props) {
	const data = props.data;
	const arr  = [];
	for(var key in data){
		if(key != 'count' && key != 'key'){
			arr.push({
				key : key,
				val : data[key]
			})
		}
	}
	return (
		<div>
			{arr.map(function(obj, i){
				const str = obj.val.split(' ');
				var num = 0;
				str.map(function(path){
					if(!isNaN(path)) num = path
				});
				
				const val = (obj.val.replace(num, '<span class="num">'+getNumSpace(num)+'</span>'))
				return <div className={'info '+obj.key} key={obj.key} dangerouslySetInnerHTML={{__html: val}} ></div>
			})}
		</div>
	)
}