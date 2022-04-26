//REFAKTORISANO
import { faSave, faCopy, faPaste, faSearch, faLink, faUndo } from '@fortawesome/free-solid-svg-icons';
import { useDeviceDetect } from '../../../../helpers/universalFunctions';
import Distancer from '../../Distancer';
import ListHeadButton from './ListHeadButton';
import Select from '../../Select';
import Input from '../../../UI/Forms/Input';

import classes from '../../UI.module.scss';

const ListHead = (props) => {
    const { isMobile } = useDeviceDetect();

    function stopSearch() {
        props.setDipslaySerachBar('none');
        props.setSearchInput('');
    }

    const inputClassName = isMobile ? classes.InputTextMob : classes.InputText;

    return (
        <>
            <div className={isMobile ? classes.ListHeadMob : classes.ListHead}>
                <div className={classes.Title}>{props.title}</div>
                <Distancer />
                <ListHeadButton
                    className={classes.CopyWeek}
                    value="Kopiraj"
                    faIcon={faCopy}
                    display={props.displayCopy}
                />
                <ListHeadButton
                    className={classes.CopyWeek}
                    value="Nalepi"
                    faIcon={faPaste}
                    display={props.displayPaste}
                />
                <Select className={classes.SelectWeek} displaySelect={props.displaySelectWeek}>
                    <option value="060">1|01.01.2021.-07.01.2021.</option>
                    <option value="061">2|08.01.2021.-15.01.2021.</option>
                    <option value="062">3|01.01.2021.-07.01.2021.</option>
                    <option value="063">4|01.01.2021.-07.01.2021.</option>
                    <option value="064">5|01.01.2021.-07.01.2021.</option>
                    <option value="065">6|01.01.2021.-07.01.2021.</option>
                    <option value="066">7|01.01.2021.-07.01.2021.</option>
                    <option value="069">8|01.01.2021.-07.01.2021.</option>
                </Select>
                <ListHeadButton
                    className={classes.CopyWeek}
                    faIcon={faSearch}
                    display={props.displaySearch}
                    onClick={props.onClickSearch}
                />
                <ListHeadButton className={classes.CopyWeek} value="Link" faIcon={faLink} display={props.displayLink} />
                <ListHeadButton
                    className={classes.CopyWeek}
                    value={isMobile ? '' : `Dodaj ${props.add}`}
                    faIcon={props.addNew}
                    display={props.displayAdd}
                    onClick={props.onAdd}
                />
                <ListHeadButton
                    className={classes.Save}
                    value="Stopiraj izmene"
                    faIcon={faUndo}
                    display={!isMobile && props.isProfile === 1 ? props.displayUndo : 'none'}
                    onClick={props.stopEdit}
                />
                <ListHeadButton
                    className={classes.Save}
                    value="Sačuvaj izmene"
                    faIcon={faSave}
                    display={isMobile ? 'none' : props.displaySave}
                    onClick={props.onSave}
                />
            </div>
            <div
                className={isMobile ? classes.SearchBarContainerMob : classes.SearchBarContainer}
                style={{ display: props.dipslaySerachBar }}
            >
                <Input
                    type="text"
                    name="searchBar"
                    value={props.searchInput}
                    className={isMobile ? inputClassName : [inputClassName, classes.SearchBar].join(' ')}
                    onChange={(e) => props.setSearchInput(e.target.value.toLowerCase())}
                ></Input>
                <Input type="button" name="stopSearch" value="Poništi" onClick={() => stopSearch()} />
            </div>
        </>
    );
};

export default ListHead;
