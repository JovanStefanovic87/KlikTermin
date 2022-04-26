import Link from 'next/link';

const NavItem = props => (
	// eslint-disable-next-line
	<li
		onClick={props.onClick}
		className={props.className}
		style={{
			display: props.display,
			marginLeft: props.marginLeft,
			color: props.color,
		}}>
		<Link href={props.link}>{props.children}</Link>
	</li>
);

export default NavItem;
