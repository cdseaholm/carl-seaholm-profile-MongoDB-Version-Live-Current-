import MotionWrap from "@/components/listeners/motionwrap";
import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";

export const metadata = {
    title: "Logout Static Page",
    description: "Actual Landing Page for the logout page."
};

export default function LogoutLayout({ children }: { children: React.ReactNode }) {
    return (
        <MotionWrap key="logoutLayout">
            <MainPageBody>
                {children}
            </MainPageBody>
        </MotionWrap>
    );
}