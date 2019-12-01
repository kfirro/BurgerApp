import React from 'react';
import Auxilary from '../../../hoc/Auxilary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css';

const modal = (props) => (
    <Auxilary>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div className={classes.Modal}
            style={
                {
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }
            }
        >
            {props.children}
        </div>
    </Auxilary>
);

export default modal;