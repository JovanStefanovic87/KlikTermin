import { useEffect, useState } from 'react'
import Router from 'next/router'
import moment from 'moment'

export function useDeviceDetect() {
	const [isMobile, setMobile] = useState(false)

	useEffect(() => {
		const userAgent = window.navigator === 'undefined' ? '' : navigator.userAgent
		const mobile = Boolean(
			userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i),
		)
		setMobile(mobile)
	}, [])

	return { isMobile }
}

export const emailPattern =
	/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
export const numericPattern = /^\d+$/

export function cookieReqParser(cookiesString, cookieName) {
	if (cookiesString != undefined) {
		let numOfCookies = cookiesString.split(';').length

		for (var i = 0; i < numOfCookies; i++) {
			let cookie = cookiesString.split(';')[i]

			if (cookie.split('=')[0].trim() === cookieName) {
				return cookie.split('=')[1].trim()
			}
		}
	}
	return ''
}

export function inputChangedHandler(e, inputIdentifier, state, setState) {
	const updatedFormElement = updateObject(state[inputIdentifier], {
		value: e.target.value,
		valid: checkValidity(e.target.value, state[inputIdentifier]),
		touched: true,
	})

	setState(
		updateObject(state, {
			[inputIdentifier]: updatedFormElement,
		}),
	)
}

export function inputChangedHandlerArray(e, inputIdentifier, setState, id) {
	setState(f => f.map(d => (d.id === id ? { ...d, [inputIdentifier]: e.target.value } : d)))
}

export function inputChangedHandlerCheckBox(itemId, inputIdentifier, setState, id) {
	setState(f => f.map(d => (d.id === id ? { ...d, [inputIdentifier]: itemId } : d)))
}

export function absenceHoursResetHandler(inputIdentifier, setState, id) {
	setState(f => f.map(d => (d.id === id ? { ...d, [inputIdentifier]: '--:--' } : d)))
}

export function checkValidity(value, rules) {
	let isValid = true
	if (!rules) {
		return true
	}

	if (rules.required) {
		isValid = value.trim() !== '' && isValid
	}

	if (rules.minLength) {
		isValid = value.length >= rules.minLength && isValid
	}

	if (rules.maxLength) {
		isValid = value.length <= rules.maxLength && isValid
	}

	if (rules.isEmail) {
		const pattern =
			/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
		isValid = pattern.test(value) && isValid
	}

	if (rules.isNumeric) {
		const pattern = /^\d+$/
		isValid = pattern.test(value) && isValid
	}

	return isValid
}

export function responseHandler(setState, message, border, triger, setIsLoading) {
	setState({
		message: message,
		border: border,
		triger: triger,
	})
	setIsLoading(false)
}

export function confirmHandler(setState, message, triger, setIsLoading) {
	setState({
		message: message,
		triger: triger,
	})
	setIsLoading(false)
}

export function infoMessageHandler(setState, message, triger, setIsLoading) {
	setState({
		message: message,
		triger: triger,
	})
	setIsLoading(false)
}

export function verifyHandler(setState, message, border, triger, setIsLoading) {
	setState({
		message: message,
		border: border,
		triger: triger,
	})
	setIsLoading(false)
}

export function updateValidity(setState, state, key, value, valid) {
	setState({
		...state,
		[key]: {
			value,
			valid,
		},
	})
}

export const updateObject = (oldObject, updatedProperties) => ({
	...oldObject,
	...updatedProperties,
})

export function redirectUser(location) {
	Router.push(location)
}

export function debounce(func, duration) {
	let shouldWait = false
	return function (...args) {
		if (!shouldWait) {
			func.apply(this, args)
			shouldWait = true
			setTimeout(function () {
				shouldWait = false
			}, duration)
		}
	}
}

export const currDayFormat = day => {
	const currDay = day.getDate() + '.' + (day.getMonth() + 1) + '.' + day.getFullYear() + '.'

	return currDay
}

export const checkBoxGroupToArrayHandler = (e, state, setState) => {
	if (e.target.checked) {
		setState([...state, e.target.id])
	} else {
		setState(state.filter(item => item !== e.target.id))
	}
}

function getWindowDimensions() {
	if (typeof window !== 'undefined') {
		const { innerWidth: width, innerHeight: height } = window
		return {
			width,
			height,
		}
	}
}

export function useWindowSize() {
	// Initialize state with undefined width/height so server and client renders match
	// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	})

	useEffect(() => {
		function handleResize() {
			// Set window width/height to state
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			})
		}
		// only execute all the code below in client side
		if (typeof window !== 'undefined') {
			// Handler to call on window resize

			// Add event listener
			window.addEventListener('resize', handleResize)

			// Call handler right away so state gets updated with initial window size
			handleResize()

			// Remove event listener on cleanup
			return () => window.removeEventListener('resize', handleResize)
		}
	}, []) // Empty array ensures that effect is only run on mount
	return windowSize
}

export function getMonday(date) {
	var day = date.getDay() || 7
	if (day !== 1) date.setHours(-24 * (day - 1))
	return date
}

export function getMondayForAPI(date) {
	const mondayDateTime = getMonday(date ? date : new Date())
	const year = mondayDateTime.getFullYear()
	const month = ('0' + (mondayDateTime.getMonth() + 1)).slice(-2)
	const day = ('0' + mondayDateTime.getDate()).slice(-2)
	const mondayDate = `${year}-${month}-${day}`
	return mondayDate
}

export function getDateFromDayOfWeek(date, day) {
	const monday = getMonday(date)
	return moment(monday).add(day, 'days').startOf('day').format()
}

export function isObjEmpty(obj) {
	for (var prop in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, prop)) {
			return false
		}
	}

	return JSON.stringify(obj) === JSON.stringify({})
}

export function getTimeString(h, seconds = false) {
	const hour = `0${Math.floor(h / 60)}`.slice(-2)
	const minutes = `0${h % 60}`.slice(-2)
	return hour == 24 ? `23:59:59` : `${hour}:${minutes}${seconds ? ':00' : ''}`
}

export function getErrorMessage(errorResponse) {
	if (!errorResponse) return ''
	if (errorResponse.status == 400 && errorResponse.data?.length > 0) {
		return errorResponse.data.map(d => d.errorMessage).join('...')
	} else {
		return `Status: ${errorResponse.status} | Došlo je do greške, kontaktirajte nas putem kontakt forme!`
	}
}

export const getResponseData = response => response.data.map(data => data)

export function parseJwt(token) {
	if (!token) {
		return null
	}

	var base64Url = token.split('.')[1]
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
	var jsonPayload = decodeURIComponent(
		atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
			})
			.join(''),
	)

	return JSON.parse(jsonPayload)
}
