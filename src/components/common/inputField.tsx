/* eslint-disable react/require-default-props */

import { useState } from "react";

export interface Props {
	label: string;
	placeholder: string;
	name: string;
	error: string | null;
	type?: "text" | "number";
	value?: string | number;
	disabled?: boolean;
	required?: boolean;
	className?: string;
	onChange?: (_event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
	label,
	name,
	placeholder,
	error,
	className,
	type = "text",
	...inputProps
}: Props) => {
	const [showPlaceholder, setShowPlaceholder] = useState(false);
	return (
		<div>
			<div className="relative">
				<input
					onFocus={() => setShowPlaceholder(true)}
					onBlur={() => setShowPlaceholder(false)}
					type={type}
					name={name}
					id={`floating-${name}`}
					className={`${
						error
							? "border-red-500 dark:border-red-500"
							: "border-gray-500 dark:border-gray-500"
					} border-1 peer block w-full appearance-none rounded-md border bg-transparent px-2.5 py-4 text-base text-gray-900 focus:border-2 focus:outline-none focus:ring-0 dark:text-black`}
					placeholder={showPlaceholder ? placeholder : " "}
					{...inputProps}
				/>
				<label
					htmlFor={`floating-${name}`}
					className={`${
						error
							? "text-red-500 dark:text-red-500"
							: "text-gray-500 dark:text-gray-500"
					} absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-base  duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-white`}
				>
					{label}
				</label>
			</div>
			{error && <span className="p-1 pl-4 text-sm text-red-500">{error}</span>}
		</div>
	);
};

export default InputField;
