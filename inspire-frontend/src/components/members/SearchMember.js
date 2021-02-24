import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

const SearchMember = ({ onChangeSearch })  => {

    const [ search, setSearch ] = useState('');

    const thisinput = useRef(null)

    useEffect(() => {
        thisinput.current.focus();
    })

    return (
        <div className='search'>
            <span>Búsqueda</span>
            <input type="text" 
                ref={thisinput}
                value={search} 
                onChange={e => { 
                    const { value } = e.target;
                    setSearch(value);
                    onChangeSearch(value);
                }} />
        </div>
    );
};

export default SearchMember;