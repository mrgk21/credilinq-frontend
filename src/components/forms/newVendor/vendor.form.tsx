import Button from "@src/components/common/button";
import { Dropzone } from "@src/components/common/dropzone";
import InputField from "@src/components/common/inputField";
import { useCallback, useState } from "react";
import { GoCheck } from "react-icons/go";
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { ValidationError } from "yup";
import FormSubHeader from "../form.subHeader";
import { vendorSchema } from "./vendor.validation";

interface CustomElements extends HTMLFormControlsCollection {
	comp_uen: HTMLInputElement;
	comp_name: HTMLInputElement;
	appl_name: HTMLInputElement;
	appl_pos: HTMLInputElement;
	appl_email1: HTMLInputElement;
	appl_email2: HTMLInputElement;
	appl_mobile: HTMLInputElement;
}

interface RegisterForm extends HTMLFormElement {
	readonly elements: CustomElements;
}

enum Progress {
	STARTED,
	COMPLETED_COMP,
	COMPLETED_APPL,
	COMPLETED_DOCS,
	COMPLETED_TNC,
	SUBMITTED,
}

const NewVendorForm = () => {
	const [formProgress, setFormProgress] = useState<Progress>(Progress.STARTED);
	const [tncCheck, setTncCheck] = useState<boolean>(false);
	const [errors, setErrors] = useState<{ [k: string]: string | null }>({});
	const [doc, setDoc] = useState<File | null>(null);

	const onIconUpload = useCallback(async (iconFiles: File[]) => {
		setDoc(iconFiles[0]);

		const err = { ...errors };
		err.icon = null;
		setErrors(err);
	}, []);

	console.log({ errors });

	const handleSubmit = async (e: React.FormEvent<RegisterForm>) => {
		e.preventDefault();
		const { comp_name, comp_uen, appl_email1, appl_email2, appl_mobile, appl_name, appl_pos } =
			e.currentTarget.elements;

		console.log({ elements: e.currentTarget.elements });

		try {
			const result = await vendorSchema.validate(
				{
					comp_uen: comp_uen.value,
					comp_name: comp_name.value,
					appl_name: appl_name.value,
					appl_pos: appl_pos.value,
					appl_email1: appl_email1.value,
					appl_email2: appl_email2.value,
					appl_mobile: appl_mobile.value,
					tnc: tncCheck,
				},
				{ abortEarly: false },
			);

			console.log({ result });
		} catch (error: unknown) {
			const errs: typeof errors = {};

			if (error instanceof ValidationError)
				error.inner.forEach((item) => {
					errs[item.path as string] = item.message;
				});
			setErrors(errs);
		}
	};

	const handleChange = async (e: React.ChangeEvent<HTMLElement & { name: string }>) => {
		const err = { ...errors };
		err[e.target.name] = null;
		setErrors(err);
	};

	return (
		<div>
			<form
				onSubmit={(e: React.FormEvent<RegisterForm>) => handleSubmit(e)}
				className="mx-auto flex max-w-[1150px] flex-col space-y-6 bg-white px-5 py-10 shadow-xl"
			>
				<FormSubHeader text="Company Information" />
				<section className="grid grid-cols-2 gap-x-14">
					<InputField
						error={errors.comp_uen ?? null}
						label="Company UEN"
						name="comp_uen"
						placeholder="Enter your company UEN"
						onChange={handleChange}
					/>
					<InputField
						error={errors.comp_name ?? null}
						label="Company Name"
						name="comp_name"
						placeholder="Enter your company name"
						onChange={handleChange}
					/>
				</section>
				<FormSubHeader text="Applicant Information" />
				<section className="grid grid-cols-2 gap-x-14 gap-y-4">
					<InputField
						error={errors.appl_name ?? null}
						label="Full Name"
						name="appl_name"
						placeholder="Enter your Full Name"
						onChange={handleChange}
					/>
					<InputField
						error={errors.appl_pos ?? null}
						label="Position within company"
						name="appl_pos"
						placeholder="Enter your position"
						onChange={handleChange}
					/>
					<div>
						<InputField
							error={errors.appl_email1 ?? null}
							label="Email Address"
							name="appl_email1"
							placeholder="Enter your email address"
							onChange={handleChange}
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
						onChange={handleChange}
					/>
					<InputField
						error={errors.appl_mobile ?? null}
						label="Company Name"
						name="appl_mobile"
						placeholder="Enter your company name"
						onChange={handleChange}
					/>
				</section>
				<FormSubHeader text="Upload Documents" />
				<section className="grid grid-cols-2 gap-x-14 gap-y-4">
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
									PDFs (not scanned copies) of company&apos;s operating bank
									current account(s) statements for the past 6 months.
								</div>
								<div>
									Example: If today is 16 Jun 23, then please upload bank
									statements from Dec 22 to May 23 (both months inclusive)
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
				<FormSubHeader text="Terms & Conditions" />
				<section className="space-y-3">
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
							By ticking, you are confirming that you have understood and are agreeing
							to the details mentioned:
							{errors.tnc && <p className="text-xs text-red-500">{errors.tnc}</p>}
						</div>
					</div>
					<ul className="space-y-3 pl-6">
						<li className="flex items-center space-x-6 text-text_gray">
							<GoCheck size={25} className="min-w-[25px]" />
							<p className="leading-7">
								I confirm that I am the authorized person to upload bank statements
								on behalf of my company
							</p>
						</li>
						<li className="flex space-x-6 text-text_gray">
							<GoCheck size={25} className="min-w-[25px]" />
							<p className="leading-7">
								I assure you that uploaded bank statements and provided company
								information match and are of the same company, if there is a
								mismatch then my report will not be generated
							</p>
						</li>
						<li className="flex space-x-6 text-text_gray">
							<GoCheck size={25} className="min-w-[25px]" />
							<p className="leading-7">
								I understand that this is a general report based on the bank
								statements and Credilinq is not providing a solution or guiding me
								for my business growth
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
				<Button type="submit" text="submit" className="!ml-auto" />
			</form>
		</div>
	);
};

export default NewVendorForm;
