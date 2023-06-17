import VendorForm from "@src/components/forms/newVendor/vendor.form";
import Head from "next/head";

const Home = () => {
	return (
		<>
			<Head>
				<title>SME Health - Get Started</title>
				<link rel="shortcut icon" href="/images/favicon.webp" />
			</Head>
			<div className="bg-slate-100">
				<VendorForm />
			</div>
		</>
	);
};

export default Home;
