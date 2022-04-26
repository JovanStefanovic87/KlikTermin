import { useDeviceDetect } from '../../../helpers/universalFunctions';

const CurrWeek = props => {
	const { isMobile } = useDeviceDetect();

	if (isMobile) {
		return <p>{props.currWeek}</p>;
	}
	return <h1>{props.currWeek}</h1>;
};

export default CurrWeek;
