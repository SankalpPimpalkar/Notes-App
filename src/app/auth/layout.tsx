import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Authentication",
    description: "A platform which provides you a platform to create notes.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full min-h-dvh flex">
            {children}
            <img
                className="hidden lg:block lg:1/2 xl:w-2/3 max-h-screen object-cover"
                src="/auth-gradient-background.jpeg"
                alt="auth-gradient-bg"
            />
        </div>

    );
}
