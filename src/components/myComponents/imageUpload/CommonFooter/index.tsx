import cls from 'classnames';
import { CSSProperties, FC } from 'react';
import './index.less';

interface IProps {
	onCancel: () => void;
	onSave: () => void;
	cancelText?: string;
	saveText?: string;
	className?: string;
	style?: CSSProperties;
	isPrimary?: boolean;
	saveDisabled?: boolean;
}

const defaultSize = {
	width: '138px',
	height: '40px'
};
const primarySize = {
	width: '194px',
	height: '48px'
};

const CommonFooter: FC<IProps> = ({
	onCancel,
	onSave,
	cancelText = 'Cancel',
	saveText = 'Save',
	isPrimary = true,
	className,
	style,
	saveDisabled = false
}) => {
	const size = isPrimary ? primarySize : defaultSize;
	return (
		<div className={cls('idea-post-footer', className)} style={style}>
			<button style={size} onClick={onCancel}>
				{cancelText}
			</button>
			<button style={size} onClick={onSave} disabled={saveDisabled}>
				{saveText}
			</button>
		</div>
	);
};
export default CommonFooter;
