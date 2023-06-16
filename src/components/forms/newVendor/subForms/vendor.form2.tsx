import InputField from "@src/components/common/inputField";
import FormSubHeader from "../../form.subHeader";
import { Progress } from "../vendor.form";

interface Props {
	formProgress: Progress;
	errors: { [k: string]: string | null };
	onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
}

const VendorForm2 = ({ errors, formProgress, onChange }: Props) => {
	return (
		<>
			<FormSubHeader
				text="Applicant Information"
				isCompleted={false}
				index={Progress.COMPLETED_COMP}
				currIndex={formProgress}
			/>
			<section
				className={`ml-3 grid grid-cols-2 gap-x-14 gap-y-6 border-l-[1px] border-text_gray pb-6 pl-7 ${
					formProgress < Progress.COMPLETED_COMP ? "opacity-70" : ""
				}`}
			>
				<InputField
					error={errors.appl_name ?? null}
					label="Full Name"
					name="appl_name"
					placeholder="Enter your Full Name"
					onChange={onChange}
				/>
				<InputField
					error={errors.appl_pos ?? null}
					label="Position within company"
					name="appl_pos"
					placeholder="Enter your position"
					onChange={onChange}
				/>
				<div>
					<InputField
						error={errors.appl_email1 ?? null}
						label="Email Address"
						name="appl_email1"
						placeholder="Enter your email address"
						onChange={onChange}
					/>
					<small className="text-xs text-purple">
						The report will be delivered on this email address
					</small>
				</div>
				{/* disable paste on email2 */}
				<InputField
					error={errors.appl_email2 ?? null}
					label="Re-enter email address"
					name="appl_email2"
					placeholder="Enter your email address again"
					onChange={onChange}
				/>
				<InputField
					error={errors.appl_mobile ?? null}
					label="Company Name"
					name="appl_mobile"
					placeholder="Enter your company name"
					onChange={onChange}
				/>
			</section>
		</>
	);
};

export default VendorForm2;
