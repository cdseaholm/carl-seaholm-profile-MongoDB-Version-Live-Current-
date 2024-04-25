import MotionWrap from "@/components/listeners/motionwrap";

export const metadata = {
    title: "Overview",
    description: "A brief overview of Carl Seaholm"
};

export default function OverviewLayout({ children }: { children: React.ReactNode }) {
    return (
        <MotionWrap key="overviewLayout">
            <div className="childFirst min-w-screen min-h-screen my-10 mx-10">
                {children}
            </div>
        </MotionWrap>
    );
}