export default function Heading({ title }: { title: string }) {
	return (
		<h1 className="mx-auto w-fit rounded-md bg-brand-lime p-1 text-center text-3xl font-bold text-black md:text-3xl lg:text-4xl">
			{title}
		</h1>
	);
}
