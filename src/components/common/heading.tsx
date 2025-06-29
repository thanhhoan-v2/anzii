export default function Heading({ children, size = "lg" }: { children: React.ReactNode, size?: string }) {
    return (
        <p className={`bg-[#B9FF66] p-1 rounded-md w-fit font-[700] text-black text-${size}`}>
            {children}
        </p>
    );
}