import MotionWrap from "@/components/listeners/motionwrap";
import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <MotionWrap key="profileLayout">
            <MainPageBody>
                {children}
            </MainPageBody>
        </MotionWrap>
    );
}