import { GoCheck } from "react-icons/go";
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import FormSubHeader from "../../form.subHeader";
import { Progress } from "../vendor.form";

interface Props {
	formProgress: Progress;
	tncCheck: boolean;
	setTncCheck: (k: boolean) => void;
	errors: { [k: string]: string | null };
}

const VendorForm4 = ({ formProgress, errors, tncCheck, setTncCheck }: Props) => {
	return (
		<>
			<FormSubHeader
				text="Terms & Conditions"
				isCompleted={false}
				index={Progress.COMPLETED_DOCS}
				currIndex={formProgress}
			/>
			<section
				className={`ml-3 space-y-3 pb-6 pl-7 ${
					formProgress < Progress.COMPLETED_DOCS ? "opacity-70" : ""
				}`}
			>
				<div className="flex items-center space-x-3 text-text_gray">
					{!tncCheck && (
						<MdOutlineCheckBoxOutlineBlank
							className="text-2xl hover:cursor-pointer"
							onClick={() => setTncCheck(true)}
						/>
					)}
					{tncCheck && (
						<MdOutlineCheckBox
							className="text-2xl hover:cursor-pointer"
							onClick={() => setTncCheck(false)}
						/>
					)}
					<div className="flex flex-col">
						By ticking, you are confirming that you have understood and are agreeing to
						the details mentioned:
						{errors.tnc && <p className="text-xs text-red-500">{errors.tnc}</p>}
					</div>
				</div>
				<ul className="space-y-3 pl-6">
					<li className="flex items-center space-x-6 text-text_gray">
						<GoCheck size={25} className="min-w-[25px]" />
						<p className="leading-7">
							I confirm that I am the authorized person to upload bank statements on
							behalf of my company
						</p>
					</li>
					<li className="flex space-x-6 text-text_gray">
						<GoCheck size={25} className="min-w-[25px]" />
						<p className="leading-7">
							I assure you that uploaded bank statements and provided company
							information match and are of the same company, if there is a mismatch
							then my report will not be generated
						</p>
					</li>
					<li className="flex space-x-6 text-text_gray">
						<GoCheck size={25} className="min-w-[25px]" />
						<p className="leading-7">
							I understand that this is a general report based on the bank statements
							and Credilinq is not providing a solution or guiding me for my business
							growth
						</p>
					</li>
					<li className="flex space-x-6 text-text_gray">
						<GoCheck size={25} className="min-w-[25px]" />
						<p className="leading-7">
							I have read and understand the{" "}
							<a
								href="https://smehealthcheck.credilinq.ai/terms-and-conditions"
								className="text-purple"
							>
								Terms & Conditions
							</a>
						</p>
					</li>
				</ul>
			</section>
		</>
	);
};

export default VendorForm4;
