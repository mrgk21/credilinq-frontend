/* eslint-disable react/require-default-props */

import { extensions } from "@src/constants";
import { useState } from "react";
import { FaFlag } from "react-icons/fa";

export interface Props {
	label: string;
	placeholder: string;
	name: string;
	error: string | null;
	type?: "text" | "number";
	value?: string | number;
	disabled: boolean;
	required?: boolean;
	className?: string;
	onChange?: (_event: React.ChangeEvent<HTMLInputElement>) => void;
	extension: number;
	setExtension: (ind: number) => void;
}

const InputFieldDropdown = ({
	label,
	name,
	placeholder,
	error,
	disabled,
	className,
	extension,
	setExtension,
	type = "text",
	...inputProps
}: Props) => {
	const [dropdown, setDropdown] = useState(false);

	const handleExtensionSelect = (ind: number) => {
		setDropdown(false);
		setExtension(ind);
	};

	return (
		<div className="relative">
			<div
				className={`${
					error
						? "border-red-500 dark:border-red-500"
						: "border-gray-500 dark:border-gray-500"
				} relative flex items-center rounded-md border`}
			>
				<span
					className={`h-full w-2/12 flex-grow space-x-1 pl-2 text-sm text-gray-900 ${
						!disabled ? "hover:cursor-pointer" : ""
					}`}
				>
					<div
						className="flex w-full items-center justify-around"
						onClick={() => (!disabled ? setDropdown(true) : "")}
					>
						<FaFlag size={15} className="min-w-[15px]" />
						<span className="text-base">{extensions[extension].code}</span>
					</div>
					{dropdown && (
						<div className="absolute left-3 top-8 mt-auto max-h-[500px] space-y-1 rounded-md bg-slate-100 p-2 text-black shadow-md">
							{extensions.map((item, index) => (
								<div
									className="flex items-center space-x-1 rounded-md p-1 hover:cursor-pointer hover:bg-gray-200"
									onClick={() => handleExtensionSelect(index)}
								>
									<FaFlag size={15} className="min-w-[15px]" />
									<span>{item.name}</span>
									<span>{item.code}</span>
								</div>
							))}
						</div>
					)}
				</span>

				<input
					type={type}
					name={name}
					id={`floating-${name}`}
					className="border-1 peer block w-full appearance-none  bg-transparent px-2.5 py-4 text-base text-gray-900 focus:outline-none focus:ring-0 dark:text-black"
					{...inputProps}
				/>
				<label
					htmlFor={`floating-${name}`}
					className={`${
						error
							? "text-red-500 dark:text-red-500"
							: "text-gray-500 dark:text-gray-500"
					} absolute left-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-base duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-white`}
				>
					{label}
				</label>
			</div>
			{error && <span className="p-1 pl-4 text-sm text-red-500">{error}</span>}
		</div>
	);
};

export default InputFieldDropdown;
