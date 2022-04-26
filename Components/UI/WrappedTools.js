//REFAKTURISANO
import { confirmHandler } from '../helpers/../../helpers/universalFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faFolderOpen, faEdit, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import classes from './UI.module.scss';
import classesAlt from '../Navigation/Navigation.module.scss';

const WrappedTools = (props) => {
    function resetForm() {
        if (props.descriptionEdit) {
            return;
        } else {
            props.setDataId(null);
            props.setFormInput(props.initForm);
            props.setEditMode(false);
            props.isEmployeesArray ? props.setCheckedEmployees([]) : {};
        }
    }

    const deleteItemHandler = () => {
        confirmHandler(
            props.setShowConfirmModal,
            'Da li ste sigurni da želite ukloniti uslugu sa liste?',
            !props.showConfirmModal.triger,
        );
    };

    function descriptionFormHandler() {
        props.setDisplayDescription('block');
        props.setDescriptionEdit(true);
    }

    function returnHandler() {
        props.setDisplayWrappedTools('none');
        props.setDataId(null);
        resetForm();
    }

    return (
        <div style={{ display: props.displayWrappedTools }}>
            <div className={classes.WrappedToolsChkBoxContainer} style={{ display: props.displayWrappedToolsChkBox }}>
                {props.children}
            </div>
            <div style={{ display: props.displayWrappedTools }} className={props.className}>
                <div className={classesAlt.ButtonsPair}>
                    <div onClick={() => descriptionFormHandler()}>
                        <FontAwesomeIcon
                            icon={faFolderOpen}
                            className={[classes.Icon, props.IconClassName].join(' ')}
                        />
                    </div>
                    <div onClick={props.onClickEdit}>
                        <FontAwesomeIcon icon={faEdit} className={[classes.Icon, props.IconClassName].join(' ')} />
                    </div>
                </div>
                <div className={classesAlt.ButtonsPair}>
                    <div onClick={() => deleteItemHandler()}>
                        <FontAwesomeIcon
                            icon={faTrashAlt}
                            className={[classes.Icon, props.IconClassName].join(' ')}
                            style={{ color: 'red' }}
                        />
                    </div>
                    <div onClick={() => returnHandler()}>
                        <FontAwesomeIcon icon={faArrowLeft} className={[classes.Icon, props.IconClassName].join(' ')} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WrappedTools;
