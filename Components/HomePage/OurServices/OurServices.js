import {
    faCalendarAlt,
    faSms,
    faPiggyBank,
    faUserClock,
    faBusinessTime,
    faSitemap,
    faAddressBook,
    faTruckMonster,
    faUserShield,
} from '@fortawesome/free-solid-svg-icons';
import Title from '../Title';
import OurServicesContainer from './OurServicesContainer';
import OurService from './OurService';

const OurServices = () => (
    <>
        <Title txt="Benefiti koje Vam donosi KlikTermin" />
        <OurServicesContainer>
            <OurService
                Icon={faCalendarAlt}
                title="Samozakazivanje"
                txt="Koliko vremena bi bilo potrebno da Vašem klijentu izdiktirate sve svoje slobodne termine? Omogućite im pregled slobodnih termina na osnovu čega će moći sami izabrati sebi najzgodniji termin, a da ste pri tome zaštićeni od preklapanja termina."
            />
            <OurService
                Icon={faSms}
                title="SMS podsetnik"
                txt="Dešava se da klijent zaboravi na zakazani termin? Spremni smo da rešimo i taj problem. Imate izbor korišćenja našeg SMS podsetnika. Sami odredite koliko vremena pre zakazanog termina će Vašem klijentu stići podsetnik na mobilni telefon."
            />
            <OurService
                Icon={faPiggyBank}
                title="Ušteda novca"
                txt="Svaki put kada se u toku termina javite na telefon Vi bacate vreme, a vreme je novac. Bacate vreme zato što Vam nudimo način da klijenti zakazuju termine bez da Vas prekidaju u poslu."
            />
            <OurService
                Icon={faBusinessTime}
                title="Ušteda vremena"
                txt="Koliko često se javljate na telefon u toku jednog termina kako bi Vam klijenti zakazali termin? Da li se to dešava i kada Vam radno vreme istekne? Posvetite svoje vreme zaista bitnim stvarima u životu uz našu pomoć."
            />
            <OurService
                Icon={faUserClock}
                title="Zakazivanje 24h"
                txt="Jedna od usluga koju svojim klijentima ne možete pružiti jeste da Vam zakažu termin u bilo koje doba dana ili noći, odnosno 24/7. Mi Vam i to omogućujemo bez da Vas iko budi ili prekida u poslu ili odmoru. Kalendar je dostupan 24/7 Vašim klijentima."
            />
            <OurService
                Icon={faSitemap}
                title="Organizacija"
                txt="Radno vreme Vam se menja dnevno ili nedeljno? Omogućujemo Vam da podesite radno vreme, odnosno odsustvo za čitavu godinu unapred, a pri tome možete odrediti koliko nedelja unapred klijenti mogu da Vam zakažu termin."
            />
            <OurService
                Icon={faAddressBook}
                title="Baza klijenata"
                txt="Kliktermin Vam omogućuje kreiranje baze klijenata, brojeva telefona, e-mail adresa, što ćete videti kada Vam klijent zakaže termin. Ukoliko želite, određenom klijentu, možete zabraniti dalje zakazivanje Vaših termina."
            />
            <OurService
                Icon={faTruckMonster}
                title="Mobilnost"
                txt="Da li se desilo da je neko hteo da zakaže termin, a niste znali raspored u tom momentu?Sve što Vam je potrebno jeste mobilni uređaj (telefon, tablet...) i internet da biste u svakom momentu mogli videti raspored svojih termina."
            />
            <OurService
                Icon={faUserShield}
                title="Bezbednost"
                txt="Niko ne može da Vam zakaže termin ako nije u Vašoj bazi klijenata čime ste zaštićeni od ljudi koji bi se lažno predstavili kao Vaši klijenti. Baza klijenata je kriptovana što sprečava krađu podataka."
            />
        </OurServicesContainer>
    </>
);

export default OurServices;
