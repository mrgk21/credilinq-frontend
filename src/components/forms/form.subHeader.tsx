interface Props {
	text: string;
}

const FormSubHeader = ({ text }: Props) => {
	return (
		<h2 className="w-full rounded-md bg-purple px-3 py-2 text-xl font-[500] text-white ">
			{text}
		</h2>
	);
};

export default FormSubHeader;
