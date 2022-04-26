import Link from 'next/link';
import Image from "next/image"
import logo from './logo.png';

const Logo = (props) => (
  <Link href="/">
    <Image src={logo} alt="Kliktermin" width={props.width} height={props.height} />
  </Link>
);

export default Logo;
