//REFAKTURISANO
import RingLoader from 'react-spinners/RingLoader';

const Loader = (props) => {
    const overide = {
        position: 'absolute',
        top: 'calc(50vh - 40px)',
        left: 'calc(50vw - 40px)',
        padding: '7px',
        borderRadius: '50%',
        zIndex: '9999999',
        backgroundColor: 'orange',
    };
    return <RingLoader color={'black'} loading={props.loading} size="80px" css={overide} />;
};

export default Loader;
