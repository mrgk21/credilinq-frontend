import Button from "@src/components/common/button";
import { useCallback, useState } from "react";
import { ValidationError } from "yup";
import VendorForm1 from "./subForms/vendor.form1";
import VendorForm2 from "./subForms/vendor.form2";
import VendorForm3 from "./subForms/vendor.form3";
import VendorForm4 from "./subForms/vendor.form4";
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

export enum Progress {
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

	const handleIconUpload = useCallback(async (iconFiles: File[]) => {
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
		<form
			onSubmit={(e: React.FormEvent<RegisterForm>) => handleSubmit(e)}
			className="mx-auto flex max-w-[1150px] flex-col space-y-4 bg-white px-10 py-14 shadow-xl"
		>
			<VendorForm1 errors={errors} formProgress={formProgress} onChange={handleChange} />
			<VendorForm2 errors={errors} formProgress={formProgress} onChange={handleChange} />
			<VendorForm3
				errors={errors}
				formProgress={formProgress}
				onIconUpload={handleIconUpload}
			/>
			<VendorForm4
				errors={errors}
				formProgress={formProgress}
				setTncCheck={setTncCheck}
				tncCheck={tncCheck}
			/>
			<Button type="submit" text="submit" className="!ml-auto" />
		</form>
	);
};

export default NewVendorForm;
