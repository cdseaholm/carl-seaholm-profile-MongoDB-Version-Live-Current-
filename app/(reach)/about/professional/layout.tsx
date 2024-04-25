import MotionWrap from "@/components/listeners/motionwrap";
import MainPageBody from "@/components/pagetemplates/mainpagebody/mainpagebody";


export const metadata = {
    title: "Professional Layout",
    description: "A Landing Page for my Professional Development History"
};

export default function ProfessionalLayout({ children }: { children: React.ReactNode }) {
    return (
        <MotionWrap key="professionalLayout">
            <MainPageBody>
                {children}
            </MainPageBody>
        </MotionWrap>
    );
}