import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    
    return (
        
            <MainPageBody>
                {children}
            </MainPageBody>
    );
}