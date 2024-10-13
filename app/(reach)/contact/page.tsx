import InnerTemplate from "@/components/pagetemplates/innerTemplate/innerTemplate";
import MainChild from "@/components/pagetemplates/mainchild/mainchild";

const Contact = () => {
    return (
        <MainChild>
            <InnerTemplate>
                <div className="flex flex-col justify-center items-center text-center h-full w-full">
                    <h1 className="text-black font-bold">cdseaholm@gmail.com</h1>
                    <h1 className="text-black font-bold">For more information, email with your inquiry.</h1>
                </div>
            </InnerTemplate>
        </MainChild>
    );
};

export default Contact;