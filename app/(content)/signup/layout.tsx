import MotionWrap from "@/components/listeners/motionwrap";
import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";

export const metadata = {
    title: "Static Signup Page",
    description: "A Landing Page for Sign Up Service"
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
    return (
        <MotionWrap key="signupLayout">
            <MainPageBody>
                {children}
            </MainPageBody>
        </MotionWrap>
    );
}