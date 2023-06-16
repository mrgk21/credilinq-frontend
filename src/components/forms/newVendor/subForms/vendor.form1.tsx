import InputField from "@src/components/common/inputField";
import FormSubHeader from "../../form.subHeader";
import { Progress } from "../vendor.form";

interface Props {
	formProgress: Progress;
	errors: { [k: string]: string | null };
	onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
}

const VendorForm1 = ({ formProgress, errors, onChange }: Props) => {
	return (
		<>
			<FormSubHeader
				text="Company Information"
				isCompleted={false}
				index={Progress.STARTED}
				currIndex={formProgress}
			/>
			<section className="ml-3 grid grid-cols-2 gap-x-14 gap-y-6 border-l-[1px] border-text_gray pb-6 pl-7">
				<InputField
					error={errors.comp_uen ?? null}
					label="Company UEN"
					name="comp_uen"
					placeholder="Enter your company UEN"
					onChange={onChange}
				/>
				<InputField
					error={errors.comp_name ?? null}
					label="Company Name"
					name="comp_name"
					placeholder="Enter your company name"
					onChange={onChange}
				/>
			</section>
		</>
	);
};

export default VendorForm1;
