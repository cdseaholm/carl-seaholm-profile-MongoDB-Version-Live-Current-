import MotionWrap from '@/components/listeners/motionwrap';
import MainPageBody from '@/components/pagetemplates/mainpagebody/mainpagebody';

export const metadata = {
    title: "Blog",
    description: "A collection of blog posts from Carl Seaholm."
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {

    
    return (
        <MotionWrap key={'blogLayout'}>
            <MainPageBody>
                {children}
            </MainPageBody>
        </MotionWrap>
    );
}