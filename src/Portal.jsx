import React from 'react';
import ReactDOM, { createPortal } from 'react-dom';

const Portal = () => {
    return createPortal(
        <div className='modal_base'>
            <div className='modal_box'>
                react portal
            </div>
        </div>,
        document.getElementById('portal-root')
    )
}

export default Portal;