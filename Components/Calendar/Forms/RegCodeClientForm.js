import Input from '../../UI/Forms/Input';
import DescriptionLabel from '../../UI/DescriptionLabel';

import classes from '../../UI/UI.module.scss';

const RegCodeClientForm = (props) => (
  <form
    style={{ display: props.displayRegCodeClient }}
    className={classes.Form}
  >
    <h2 className={classes.FormTitle}>REGISTRACIJA KLIJENTA</h2>
    <Input
      type="text"
      display="block"
      width="60vw"
      maxWidth="600px"
      margin="20px auto 5px auto"
      placeholder="Unesi jedinstveni kod Vašeg pružaoca usluga"
    />
    <DescriptionLabel
      className={classes.DesciptionLabel}
      text="Ukoliko nemate jedinstveni kod Vašeg pružaoca usluga, zatražite ga od pružaoca usluga"
    />
    <Input
      type="button"
      value="REGISTRUJ SE"
      display="block"
      margin="40px auto 5px auto"
      classNameButton={classes.FormButton}
      onClick={() => props.RegCodeClientHandler()}
    />
    <Input
      type="button"
      value="ODUSTANI"
      display="block"
      margin="20px auto 5px auto"
      color="orangered"
      classNameButton={classes.FormButton}
      onClick={() => props.setDisplayRegCodeClient('none')}
    />
  </form>
);

export default RegCodeClientForm;
