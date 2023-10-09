import React from 'react'
import classnames from 'classnames/bind'
import styles from './FormRow.module.scss';


const cx = classnames.bind(styles);

function FormRow({ type, name, value, handeChange, labelText   }) {
    
    return (
    <div className={cx('form-row')}>
        <label htmlFor={name} className={cx('form-label')}>{labelText}</label>
        <input type={type}   value={value} name={name} onChange={handeChange}/>
      </div>
       
  )
}

export default FormRow