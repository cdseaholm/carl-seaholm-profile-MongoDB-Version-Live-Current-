import MotionWrap from "@/components/listeners/motionwrap";
import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";

export const metadata = {
    title: "Login Static Page",
    description: "Actual Landing Page for the login page."
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <MotionWrap key="loginLayout">
            <MainPageBody>
                {children}
            </MainPageBody>
        </MotionWrap>
    );
}