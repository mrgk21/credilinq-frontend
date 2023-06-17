import { gql } from "@apollo/client";

export const CREATE_VENDOR = gql`
	mutation createVendor(
		$comp_uen: String!
		$comp_name: String!
		$appl_name: String!
		$appl_pos: String!
		$appl_email: String!
		$appl_mobile: String!
	) {
		createVendor(
			vendor: {
				company: { uen: $comp_uen, name: $comp_name }
				applicant: {
					name: $appl_name
					companyPosition: $appl_pos
					email: $appl_email
					mobile: $appl_mobile
				}
			}
		) {
			applicant {
				email
			}
		}
	}
`;
