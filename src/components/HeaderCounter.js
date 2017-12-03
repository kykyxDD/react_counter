import React from 'react';

const name_month = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const _data = new Date();
const str_date = '32 января';

function numDate(str){
	const arr = str.split(' ');
	return str.replace(arr[0], '<span class="num">'+arr[0]+'</span>');
}

function Header(props){
	var date = props.date ? props.date : str_date;
	var arr = date.split(' ');
	console.log("date", date)

	return (
		<div className='header_counter date'> 
			<div className='num'>{ arr[0] }</div> <div className="month">{arr[1]}</div>
			
		</div>
	)
}

export default Header;