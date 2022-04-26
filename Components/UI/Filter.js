const Filter = (props) => (
  <div>
    <input
      type="search"
      placeholder={props.placeholder}
      className={props.className}
    />
  </div>
);

export default Filter;
