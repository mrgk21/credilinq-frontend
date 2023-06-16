import Init from "@src/components/init";
import Navbar from "@src/components/navbar";
import "@src/styles/globals.css";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Init>
			<Navbar />
			<Component {...pageProps} />
		</Init>
	);
};

export default App;
