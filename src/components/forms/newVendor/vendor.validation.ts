import * as yup from "yup";

export const vendorSchema = yup.object().shape({
	comp_uen: yup
		.string()
		.trim()
		.min(9, "Company must be min 9 chars")
		.max(10, "Company must be max 10 chars")
		.required("Company UEN is required"), // regex validation for the string
	comp_name: yup
		.string()
		.min(3, "Company must be min 3 chars")
		.max(50, "Company must be max 50 chars")
		.required("Company Name is required"),
	appl_name: yup
		.string()
		.min(3, "Company must be min 3 chars")
		.max(50, "Company must be max 50 chars")
		.required("Full Name is required"),
	appl_pos: yup
		.string()
		.min(3, "Company must be min 3 chars")
		.max(50, "Company must be max 50 chars")
		.required("Company Position is required"),
	appl_email: yup.string().email().defined().required("Email is required"),
	appl_mobile: yup
		.string()
		.matches(/[0-9]/, "Mobile must only contain digits")
		.length(8, "Mobile must contain 8 digits"), //+65 to to added to start to make it a singapore number
	tnc: yup.bool().isTrue("Check the Terms and Conditions to proceed").required(),
});

export type VendorType = yup.InferType<typeof vendorSchema>;
