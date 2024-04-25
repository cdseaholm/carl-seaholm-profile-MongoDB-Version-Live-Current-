import MotionWrap from "@/components/listeners/motionwrap";

export const metadata = {
    title: "NP Web Apps",
    description: "A One Sheet for NP Web Apps."
};

export default function NPWebAppLayout({ children }: { children: React.ReactNode }) {
    return (
        <MotionWrap key="npwebappsLayout">
            <div className="childFirst min-w-screen min-h-screen my-10 mx-10">
            {children}
            </div>
        </MotionWrap>

    );
}