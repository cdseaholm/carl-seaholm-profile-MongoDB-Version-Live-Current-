'use client'

import { LoadingOverlay, Pagination } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { useState, useEffect } from "react";
import NameForm from "../components/forms/nameForm";
import { AlertModal } from "../components/modals/alertModal";
import Header from "../components/nav/header";
import MainWrapper from "../components/templates/mainWrapper";
import { FormattedData } from "../types/data";
import { FormatData } from "../utils/formatData";
import StoryPageFive from "./components/storyPageFive";
import StoryPageFour from "./components/storyPageFour";
import StoryPageOne from "./components/storyPageOne";
import StoryPageSix from "./components/storyPageSeven";
import StoryPageThree from "./components/storyPageThree";
import StoryPageTwo from "./components/storyPageTwo";

export default function Page() {

    const [userName, setUserName] = useState('Esteban');
    const [loading, setLoading] = useState(true);
    const [csvData, setCsvData] = useState<FormattedData[]>([]);

    const nameForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
        },
        validate: {
            name: (value) => (
                value ? (value.length > 100 ? 'Invalid title, too long' : null) : 'Title cannot be empty'
            ),
        }
    });

    const makeName = () => modals.openConfirmModal({
        title: 'What is the name you would like to use? Or use the default name',
        labels: { confirm: 'Create', cancel: userName === 'Esteban' ? 'Use default name' : 'Use name you have created' },
        closeOnConfirm: false,
        children: (
            <NameForm nameForm={nameForm} handleCreateName={handleCreateName} handleCancel={handleCancel} />
        ),
        withCloseButton: false,
        closeOnClickOutside: false,
        onConfirm: () => handleCreateName(),
        onCancel: () => handleCancel()
    });

    const nameOrNoName = () => modals.openConfirmModal({
        title: 'Would you like to use your name for the story?',
        labels: { confirm: 'Create a Name', cancel: 'Use Default name' },
        withCloseButton: false,
        closeOnClickOutside: false,
        onConfirm: () => (
            makeName()
        ),
        onCancel: () => handleCancel(),
    })

    const handleCreateName = () => {
        const errors = nameForm.validate();
        if (errors.hasErrors) {
            AlertModal({ message: errors.errors })
        } else {
            setUserName(nameForm.getValues().name);
            setLoading(false)
            modals.closeAll();
        }
    }

    const handleCancel = () => {
        setLoading(false);
        modals.closeAll();
    }

    useEffect(() => {
        nameOrNoName();
        const fetchData = async () => {
            const data = await FormatData() as { data: FormattedData[], message: string }
            if (!data) {
                console.log('Issue with data return');
            }
            if (data.message !== '') {
                console.log(data.message)
            } else {
                setCsvData(data.data);
            }
            setLoading(false);
        };

        fetchData();
    }, [nameOrNoName]);


    const textClass = `text-xl md:text-2xl lg:text-3xl font-sans`

    const [page, setPage] = useState(1);

    const pages = [
        null,
        <StoryPageOne userName={userName} textClass={textClass} key={1} />,
        <StoryPageTwo
            userName={userName}
            textClass={textClass}
            data={csvData}
            key={2}
        />,
        <StoryPageThree
            userName={userName}
            textClass={textClass}
            data={csvData}
            key={3}
        />,
        <StoryPageFour userName={userName} textClass={textClass} data={csvData} key={4} />,
        <StoryPageFive userName={userName} textClass={textClass} data={csvData} key={5} />,
        <StoryPageSix userName={userName} textClass={textClass} page={page} key={6}/>,
    ];

    return (
        <MainWrapper landing={false}>
            <Header />
            {loading ? (
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <LoadingOverlay />
                </div>
            ) : (
                <section className="flex h-full flex-col items-center justify-start w-screen px-1 overflow-y-auto overflow-x-hidden bg-gray-500/60">
                    <div className="flex flex-col justify-start items-center w-full h-content p-8 space-y-2">
                        <h1 className="flex flex-row justify-center items-center w-full h-content text-2xl md:text-3xl underline text-white">
                            {`Welcome to page ${page} of your Sommelier training ${userName}`}
                        </h1>

                        <button type="button" className={`p-1 text-blue-300 cursor-pointer hover:underline hover:text-blue-100`} onClick={() => makeName()}>
                            {`Change name`}
                        </button>

                    </div>
                    {pages[page]}
                    <div className="flex flex-row justify-evenly items-center w-full h-content py-12 px-12">
                        <button type="button" onClick={() => setPage(page - 1)} disabled={page !== 1 ? false : true}>
                            <p className={`text-base md:text-lg ${page === 1 ? 'text-gray-800/70' : 'text-white cursor-pointer hover:underline hover:text-gray-800'}`}>{`Previous`}</p>
                        </button>
                        <Pagination total={pages.length - 1} onChange={setPage} size={'xs'} withControls={false} value={page} />
                        <button type="button" onClick={() => setPage(page + 1)} disabled={page !== pages.length - 1 ? false : true}>
                            <p className={`text-base md:text-lg ${page === pages.length - 1 ? 'text-gray-800/70' : 'text-white cursor-pointer hover:underline hover:text-gray-800'}`}>{`Continue`}</p>
                        </button>
                    </div>
                </section>
            )}
        </MainWrapper>
    )
}