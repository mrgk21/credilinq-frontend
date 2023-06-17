import Button from "@src/components/common/button";
import { useEffect, useState } from "react";
import * as yup from "yup";
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

	const [data, setData] = useState<{ [k: string]: string | null }>({});
	const [errors, setErrors] = useState<{ [k: string]: any }>({});
	const [docs, setDocs] = useState<File[]>([]);

	useEffect(() => {
		let progress: Progress = Progress.STARTED;

		// calculate form progress
		if (data.comp_uen && data.comp_name) {
			progress = Progress.COMPLETED_COMP;
			if (
				data.appl_name &&
				data.appl_pos &&
				data.appl_email1 &&
				data.appl_email2 &&
				data.appl_mobile
			) {
				progress = Progress.COMPLETED_APPL;
				if (docs.length > 0) {
					progress = Progress.COMPLETED_DOCS;
					if (tncCheck) {
						progress = Progress.COMPLETED_TNC;
					}
				}
			}
		}

		setFormProgress(progress);
	}, [data, docs, tncCheck]);

	console.log({ formProgress, data });

	const handleSubmit = async (e: React.FormEvent<RegisterForm>) => {
		e.preventDefault();
		const { comp_name, comp_uen, appl_email1, appl_mobile, appl_name, appl_pos } =
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

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			if (e.target.name === "appl_email2") {
				if (e.target.value === data.appl_email1) {
					setErrors({ ...errors, ...{ [e.target.name]: null } });
					setData({ ...data, ...{ [e.target.name]: e.target.value } });
					return;
				}
				throw new ValidationError("Emails must be equal");
			}
			const result = await yup
				.reach(vendorSchema, `${[e.target.name]}`)
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				//@ts-ignore
				.validate(e.target.value);

			setErrors({ ...errors, ...{ [e.target.name]: null } });
			setData({ ...data, ...{ [e.target.name]: result } });
		} catch (error) {
			if (error instanceof ValidationError) {
				setErrors({ ...errors, ...{ [e.target.name]: error.message } });
				setData({ ...data, ...{ [e.target.name]: null } });
			}
		}
	};

	const handleDocUpload = (file: File) => {
		if (file.size / 1000 > 2000) {
			// files greater than 2mb
			setErrors({ ...errors, ...{ doc: "File size cannot exceed 2mb" } });
			return;
		}
		setErrors({ ...errors, ...{ doc: null } });
		const _docs = [...docs];
		_docs.push(file);
		setDocs((state) => {
			const _docs = [...state];
			_docs.push(file);
			return _docs;
		});
		console.log("new file", _docs);
	};

	const handleDocRemove = (ind: number) => {
		setDocs((state) => {
			const _docs = [...state];
			_docs.splice(ind, 1);
			return _docs;
		});
	};
	console.log({ docs });

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
				docUpload={handleDocUpload}
				docRemove={handleDocRemove}
				docs={docs}
			/>
			<VendorForm4
				errors={errors}
				formProgress={formProgress}
				setTncCheck={setTncCheck}
				tncCheck={tncCheck}
			/>
			<Button
				type="submit"
				text="submit"
				className={`${
					formProgress === Progress.COMPLETED_TNC ? "" : "opacity-70"
				} !ml-auto`}
				disabled={formProgress < Progress.COMPLETED_TNC}
			/>
		</form>
	);
};

export default NewVendorForm;
