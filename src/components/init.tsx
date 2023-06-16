import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

const Init = ({ children }: Props) => {
	return <main className="font-dejavu">{children}</main>;
};

export default Init;
