import { TiTick } from "react-icons/ti";

interface Props {
	text: string;
	isCompleted: boolean;
	index: number;
	currIndex: number;
}

const FormSubHeader = ({ text, isCompleted, index, currIndex }: Props) => {
	return (
		<div className="flex items-center space-x-3">
			{isCompleted && <TiTick size={25} className="min-w-[25px] rounded-full bg-green-700" />}
			{!isCompleted && (
				<span
					className={`min-w-[25px] rounded-full  text-center ${
						index === currIndex ? "bg-red-700" : "bg-[#9e9e9e]"
					}`}
				>
					{index + 1}
				</span>
			)}
			<h2 className="w-full rounded-md bg-purple px-3 py-2 text-xl font-[500] text-white ">
				{text}
			</h2>
		</div>
	);
};

export default FormSubHeader;
