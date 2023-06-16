import Button from "@src/components/common/button";
import InputField from "@src/components/common/inputField";
import { useCallback, useState } from "react";
import { ValidationError } from "yup";
import FormSubHeader from "../form.subHeader";
import { vendorSchema } from "./vendor.validation";

interface CustomElements extends HTMLFormControlsCollection {
	comp_uen: HTMLInputElement;
	comp_name: HTMLInputElement;
	language: HTMLSelectElement;
	game: HTMLSelectElement;
	about: HTMLTextAreaElement;
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
		const { comp_name, comp_uen } = e.currentTarget.elements;

		console.log({ elements: e.currentTarget.elements });

		try {
			const result = await vendorSchema.validate(
				{
					comp_uen: comp_uen.value,
					comp_name: comp_name.value,
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
			className="space-y-6 p-10"
		>
			<FormSubHeader text="Company Information" />
			<section className="grid grid-cols-2 gap-14">
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
			<Button type="submit" text="submit" />
		</form>
	);
};

export default NewVendorForm;
