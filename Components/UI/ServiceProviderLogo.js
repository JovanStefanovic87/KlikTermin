import Image from "next/image"

const ServiceProviderLogo = (props) => (
  <div className={props.className}>
    <Image src={props.src} alt={props.alt}/>
    <p>{props.salonName}</p>
  </div>
);

export default ServiceProviderLogo;
