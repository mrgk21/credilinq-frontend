/* eslint-disable react/require-default-props */

interface Props {
	text: string | React.ReactNode;
	type?: "button" | "submit" | "reset" | undefined;
	disabled?: boolean;
	name?: string;
	className?: string;
	onClick?: (_event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ text, className, ...buttonProps }: Props) => {
	return (
		<button
			type="button"
			className={`rounded-md bg-gray-300 p-1 px-3 text-sm font-bold uppercase leading-7 text-text_gray ${className}`}
			{...buttonProps}
		>
			{text}
		</button>
	);
};

export default Button;
