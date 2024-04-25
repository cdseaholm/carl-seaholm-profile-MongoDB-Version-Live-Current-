import MotionWrap from "@/components/listeners/motionwrap";

export const metadata = {
    title: "NP Apps",
    description: "A One Sheet for NP Apps."
};

export default function NPAppsLayout({ children }: { children: React.ReactNode }) {
    return (
        <MotionWrap key="npappsLayout">
            <div className="childFirst min-w-screen min-h-screen my-10 mx-10">
            {children}
            </div>
        </MotionWrap>
    );
}