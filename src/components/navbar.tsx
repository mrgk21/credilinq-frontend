import Image from "next/image";

const Navbar = () => {
	return (
		<nav className=" sticky right-0 top-0 z-50 flex min-h-[125px] items-center justify-around bg-[url(/images/header-bg.jpg)] bg-cover">
			<Image
				src="/images/logo.png"
				alt="logo"
				height={0}
				width={0}
				sizes="100vw"
				className="h-[80px] w-auto "
			/>
			<span className="text-3xl text-white">SME HealthCheck - Get Started</span>
		</nav>
	);
};

export default Navbar;
