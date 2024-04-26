import MotionWrap from "@/components/listeners/motionwrap";

export const metadata = {
    title: "Dashboard",
    description: "Dashboard for all hobbies to be tracked and viewed"
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <MotionWrap key="dashboardlayout">
            {children}
        </MotionWrap>
    );
}

