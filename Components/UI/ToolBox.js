import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import classes from './UI.module.scss';

const ToolBox = props => {
	return (
		<div className={classes.ToolBoxMob} style={{ display: props.displayToolBox }}>
			<h4 className={classes.Name}>{props.userForEdit}</h4>
			<div className={classes.HorButtonWrapper}>
				<Button onClick={props.onEdit} className={classes.onEdit} icon={<EditOutlined />} />
				<Button onClick={props.onDelete} className={classes.onDelete} icon={<DeleteOutlined />} />
			</div>
		</div>
	);
};

export default ToolBox;
