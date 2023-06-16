import { Dropzone } from "@src/components/common/dropzone";
import { GoCheck } from "react-icons/go";
import FormSubHeader from "../../form.subHeader";
import { Progress } from "../vendor.form";

interface Props {
	formProgress: Progress;
	errors: { [k: string]: string | null };
	onIconUpload: (_acceptedFiles: File[]) => Promise<void>;
}

const VendorForm3 = ({ errors, formProgress, onIconUpload }: Props) => {
	return (
		<>
			<FormSubHeader
				text="Upload Documents"
				isCompleted={false}
				index={Progress.COMPLETED_APPL}
				currIndex={formProgress}
			/>
			<section
				className={`ml-3 grid grid-cols-2 gap-x-14 gap-y-6 border-l-[1px] border-text_gray pb-6 pl-7 ${
					formProgress < Progress.COMPLETED_APPL ? "opacity-70" : ""
				}`}
			>
				<Dropzone
					label="Upload an image:"
					name="image"
					fileTypes={{ "x-pdf/*": [] }}
					error={errors.image ?? null}
					onDrop={onIconUpload}
					disabled={false}
				/>
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
