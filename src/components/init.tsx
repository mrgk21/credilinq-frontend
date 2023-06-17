import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@src/utils/init/apollo.config";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

const Init = ({ children }: Props) => {
	return (
		<main className="font-dejavu">
			<ApolloProvider client={apolloClient}>{children}</ApolloProvider>
		</main>
	);
};

export default Init;
