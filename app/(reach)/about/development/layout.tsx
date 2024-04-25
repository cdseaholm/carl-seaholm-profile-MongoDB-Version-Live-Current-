import MotionWrap from "@/components/listeners/motionwrap";

export const metadata = {
    title: "Development Layout",
    description: "A Landing Page for my Professional Development History"
};

export default function DevelopmentLayout({ children }: { children: React.ReactNode }) {
    return (
        <MotionWrap key="developmentLayout">
            <div>
                {children}
            </div>
        </MotionWrap>
    );
}