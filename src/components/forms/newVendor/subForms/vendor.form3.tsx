import { Dropzone } from "@src/components/common/dropzone";
import { useCallback } from "react";
import { GoCheck } from "react-icons/go";
import { IoCloseCircle } from "react-icons/io5";
import FormSubHeader from "../../form.subHeader";
import { Progress } from "../vendor.form";

interface Props {
	formProgress: Progress;
	errors: { [k: string]: string | null };
	docs: File[] | [];
	docUpload: (_acceptedFile: File) => void;
	docRemove: (_index: number) => void;
}

const VendorForm3 = ({ errors, formProgress, docs, docUpload, docRemove }: Props) => {
	const isCompleted = formProgress > Progress.COMPLETED_APPL;
	const isCurrent = formProgress === Progress.COMPLETED_APPL;
	const maxDocLimit = docs.length === 6;

	const handleDocUpload = useCallback(async (docFiles: File[]) => {
		docUpload(docFiles[0]);
	}, []);

	return (
		<>
			<FormSubHeader
				text="Upload Documents"
				index={Progress.COMPLETED_APPL}
				isCompleted={isCompleted}
				isCurrent={isCurrent}
			/>
			<section
				className={`ml-3 grid grid-cols-2 gap-x-14 gap-y-6 border-l-[1px] border-text_gray pb-6 pl-7 ${
					!isCompleted && !isCurrent ? "opacity-70" : ""
				}`}
			>
				<div className=" flex flex-col ">
					<Dropzone
						label="Upload documents"
						name="doc"
						maxFiles={1}
						fileTypes={{ "application/pdf": [] }}
						error={errors.doc ?? null}
						onDrop={handleDocUpload}
						disabled={(!isCompleted && !isCurrent) || maxDocLimit}
					/>
					{maxDocLimit && (
						<small className="text-sm text-yellow-500">
							Max document upload limit reached
						</small>
					)}
					<ul className="flex w-full flex-grow flex-col justify-end space-y-2 text-lg text-black">
						{docs.map((doc, index) => (
							<li className="flex items-center justify-between rounded-full border border-text_gray px-5 py-2 text-center">
								<span>{index + 1}</span>
								<span className="w-1/2 truncate">{doc.name}</span>
								{(isCompleted || isCurrent) && (
									<IoCloseCircle
										size={30}
										className="min-w-[30px] text-red-500 hover:cursor-pointer"
										onClick={() => docRemove(index)}
									/>
								)}
								{!isCompleted && !isCurrent && (
									<IoCloseCircle
										size={30}
										className="min-w-[30px] text-gray-500 "
									/>
								)}
							</li>
						))}
					</ul>
				</div>
				<div className="space-y-3">
					<section className="flex space-x-3 text-text_gray">
						<GoCheck size={25} className="min-w-[25px]" />
						<span className="space-y-1 leading-7">
							<div>
								PDFs (not scanned copies) of company&apos;s operating bank current
								account(s) statements for the past 6 months.
							</div>
							<div>
								Example: If today is 16 Jun 23, then please upload bank statements
								from Dec 22 to May 23 (both months inclusive)
							</div>
						</span>
					</section>
					<section className="flex space-x-3 text-text_gray">
						<GoCheck size={25} className="min-w-[25px]" />
						<div className="leading-7">
							If your company is multi-banked, then please upload 6 months bank
							statements for each bank account
						</div>
					</section>
					<section className="flex space-x-3 text-text_gray">
						<GoCheck size={25} className="min-w-[25px]" />
						<div className="leading-7">
							If your file is password protected, we request you to remove the
							password and upload the file to avoid submission failure
						</div>
					</section>
					<section className="flex space-x-3 text-text_gray">
						<GoCheck size={25} className="min-w-[25px]" />
						<div className="leading-7">
							In case if you are facing any issue while uploading bank statements,
							Please contact us on{" "}
							<a href="mailto:support@credilinq.ai" className="text-purple">
								support@credilinq.ai
							</a>
						</div>
					</section>
				</div>
			</section>
		</>
	);
};

export default VendorForm3;
