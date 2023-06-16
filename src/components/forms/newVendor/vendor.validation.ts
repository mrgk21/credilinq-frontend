import * as yup from "yup";

export const vendorSchema = yup.object().shape({
	comp_uen: yup.string().min(9).max(10).required("Company UEN is required"), // regex validation for the string
	comp_name: yup.string().min(3).max(50).required("Company Name is required"),
	appl_name: yup.string().min(3).max(50).required(),
	appl_pos: yup.string().min(3).max(50).required(),
	appl_email: yup.string().email(),
	appl_mobile: yup.string().length(8), //+65 to to added to start to make it a singapore number
	doc1: yup.mixed().defined("Document must be uploaded").required(),
	doc2: yup.mixed().defined("Document must be uploaded").required(),
	doc3: yup.mixed().defined("Document must be uploaded").required(),
	doc4: yup.mixed().defined("Document must be uploaded").required(),
	doc5: yup.mixed().defined("Document must be uploaded").required(),
	doc6: yup.mixed().defined("Document must be uploaded").required(),
	tnc: yup.bool().isTrue().required(),
});

export type VendorType = yup.InferType<typeof vendorSchema>;
