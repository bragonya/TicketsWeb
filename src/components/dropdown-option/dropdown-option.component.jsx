import React from 'react';

const DropdownOption = () => (
    <div class="btn-group dropright">
        <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropright
        </button>
        <div className="dropdown-menu">
            <a className="dropdown-item" href="/">Action</a>
            <a className="dropdown-item" href="/">Another action</a>
            <a className="dropdown-item" href="/">Something else here</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="/">Separated link</a>    
        </div>
    </div>
);

export default DropdownOption;