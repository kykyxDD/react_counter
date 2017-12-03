import React from 'react';

export default function ElemTitle(proms) {
	var text = '';
	text = proms.data === "flies" ? 
			"Вылетает сейчас": 
				proms.data === "book" ? 
				"Забронировано туров" : 
				proms.data === "rest" ? 
				"Отдыхает сейчас": 
				proms.data === "exc" ? 
				"Забронировано экскурсий" : 
				proms.data === "tkt" ? 
				'Забронировано билетов' : ''
	return (
		<div className='name_counter'>
			
			<div className='someclassname'>
				
				<span>{text}</span> 
			</div>
		</div>
	)
}

