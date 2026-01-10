interface AuthenticationLayoutProps {
    children: React.ReactNode
}

export default function AuthenticationLayout({ children }: AuthenticationLayoutProps) {
    return (
        <div className="min-h-screen flex items-center justify-center flex-col">
            {children}
        </div>
    )
}