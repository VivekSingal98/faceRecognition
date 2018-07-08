import React from 'react';
import './ImageLinkedForm.css'
const ImageLinkedForm= ({onInputChange, onButtonSubmit}) => {
	return (
		<div>
			<p className='f3'>
				{'This Magic Brain 	will detect faces in your pictures'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
					<button className='w-30 grow f4 link ph3 pv2 dib bg-light' onClick={onButtonSubmit}>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkedForm;