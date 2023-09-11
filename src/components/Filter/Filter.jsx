import { setFilter, getFilter } from 'redux/filter/sliceFilter';
import { useDispatch, useSelector } from 'react-redux';
import css from 'components/Filter/Filter.module.css';

import React from 'react';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const onFilterContacts = query => {
    dispatch(setFilter(query.target.value));
  };

  return (
    <>
      <label className={css.title}>
        Find contact by name
        <input
          type="text"
          value={filter}
          name="filter"
          onChange={onFilterContacts}
          placeholder="Enter the filter value..."
        />
      </label>
    </>
  );
};