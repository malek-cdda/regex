import Image from "next/image";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <CheckBox label="global" />
        </main>
    );
}

const CheckBox = ({ label, value, onChange }) => {
    return (
        <>
            <label htmlFor="global">
                {label}
                <input type="checkbox" id="global" />
            </label>
        </>
    );
};
