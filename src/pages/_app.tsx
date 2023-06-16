import Init from "@src/components/init";
import "@src/styles/globals.css";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<Init>
			<Component {...pageProps} />
		</Init>
	);
};

export default App;
