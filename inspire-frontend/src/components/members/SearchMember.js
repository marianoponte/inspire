import React from 'react';

const SearchMember = () => {
    return (
    <form className="form-inline my-2 my-lg-0 form-search">
        <input className="form-control mr-sm-1" id="input-search-member" type="text" placeholder="Buscar" />
        <button className="btn btn-secondary my-2 my-sm-0" id="btn-search-member" type="submit">Buscar</button>
    </form>
    );
};

export default SearchMember;