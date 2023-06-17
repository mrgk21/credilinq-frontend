import Init from "@src/components/init";
import Navbar from "@src/components/navbar";
import "@src/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Init>
			<Navbar />
			<Component {...pageProps} />
			<Toaster />
		</Init>
	);
};

export default App;
