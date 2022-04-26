import { useState, useEffect } from 'react';
import { cookieReqParser, responseHandler, infoMessageHandler } from '../../../helpers/universalFunctions';
import { fetchJson } from '../../../api/fetchJson';
import { userVerification } from '../../../api/userVerification';

import VerifyModal from '../../../Components/UI/Modal/VerifyModal';

const UserVerificationPage = props => {
	const [showResponseModal, setShowResponseModal] = useState({
		triger: false,
		message: null,
		border: '',
	});
	const [showInfoModal, setShowInfoModal] = useState({
		triger: false,
		message: null,
	});

	const id = props.id;
	const type = props.type;
	const userData = {
		userId: id,
		verificationType: type,
	};

	const errorMessage = (err, message = 'Došlo je do greške, kontaktirajte nas putem kontakt forme') => {
		console.log(err)
		responseHandler(setShowResponseModal, message, 'red', showResponseModal.triger);
		props.setShowBackdrop(props.classes.backdropIn);
	};

	const userVerificationHandler = () => {
		const api = userVerification(userData)
			.then(response => {
				console.log(response);
				infoMessageHandler(
					setShowInfoModal,
					'Verifikacija uspešna',
					!showInfoModal.triger
				);
				setShowResponseModal(!showResponseModal);
			})
			.catch(err => {
				if (err.response) {
					console.log(err.response);
					err.response.data.map(err => {
						responseHandler(setShowResponseModal, err.response, 'red', showResponseModal.triger);
					});
				} else if (err.request) {
					errorMessage(err.request)
				} else {
					errorMessage(err)
				}
			});
		api;
	};

	useEffect(() => {
		userVerificationHandler();
	}, []);

	const typeString = type === 'phone' ? 'broj telefona' : 'e-mail adresu';

	return (
		<>
			<VerifyModal
				message={`Uspesno ste verifikovali ${typeString}`}
				display="block"
				borderColor="green"
				link="/"
				modalTriger={showResponseModal}
			/>
		</>
	);
};

UserVerificationPage.getInitialProps = async ({ req, query }) => {
	const { id, type } = query;
	let cookiesString = req != undefined ? req.headers.cookie : '';
	let token = cookieReqParser(cookiesString, 'pdfgen_token');

	async function getUserParams() {
		const userParams = await fetchJson('/user-verification' + id + '/' + type, 'get', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		})
			.then(res => (res.status === 200 ? res.text() : ''))
			.catch(error => {
				console.log(error);
				return [];
			});

		if (userParams != undefined) {
			return userParams;
		}
	}

	return {
		getUserParams: await getUserParams(),
		id: id,
		type: type,
	};
};

export default UserVerificationPage;
