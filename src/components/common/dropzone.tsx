/* eslint-disable react/require-default-props */

import { useDropzone } from "react-dropzone";
import { FaFileUpload } from "react-icons/fa";

interface IFileTypes {
	[key: string]: Array<string>;
}

interface DropzoneProps {
	name: string;
	label: string;
	maxFiles?: number;
	error?: string | null;
	className?: string;
	fileTypes?: IFileTypes; // use MIME Types
	disabled: boolean;
	onDrop: (_acceptedFiles: File[]) => Promise<void>;
}

const Dropzone = ({
	label,
	name,
	fileTypes = { "*": [] },
	onDrop,
	maxFiles = 1,
	className = "",
	error = null,
	disabled,
}: DropzoneProps) => {
	const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
		accept: fileTypes,
		maxFiles,
		onDrop,
	});

	return (
		<div className="flex flex-col focus:bg-none">
			<div
				className={`flex min-w-full flex-col items-center justify-center gap-[12px] rounded-lg border-[1px] border-dashed border-[#3F3F3F] bg-[#ffffff25] p-4 hover:cursor-pointer focus:border-indigo-500 
					${disabled ? "pointer-events-none" : ""}
					${className}`}
				{...getRootProps({ isDragAccept, isDragReject })}
			>
				<input {...getInputProps()} className="focus:bg-none" />
				<div className="rounded-full bg-gray-200 p-3 ">
					<FaFileUpload className=" text-2xl text-black" />
				</div>
				<span className="text-black dark:text-black">
					<span className=" underline">Click to upload</span> or drag and drop Bank
					Statements
				</span>
			</div>
		</div>
	);
};

export { Dropzone };
export type { DropzoneProps };
