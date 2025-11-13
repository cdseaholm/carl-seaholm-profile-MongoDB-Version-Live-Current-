'use client'

export default function ModalHobby({categoryPassed, categories, goalChild, goalPlaceHolder, handleColorUpdate, HandleCreateHobby, handleCategoryCreate, changeGoalChild, colorName, catCreate, handleModalOpen}: {categoryPassed: string, categories: string[], goalChild: string, goalPlaceHolder: string, handleColorUpdate: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>, handleCategoryCreate: () => void, HandleCreateHobby: (event: React.FormEvent<HTMLFormElement>) => Promise<void>, changeGoalChild: (goalValueSelected: string) => void, colorName: string, catCreate: boolean, handleModalOpen: () => void}) {

    return (

        <form className="p-4 md:p-5" onSubmit={HandleCreateHobby}>
            <div className="grid gap-4 mb-4 grid-cols-1">
                <div className="flex flex-row justify-between space-x-1">
                    <div>
                        <label htmlFor="modalHobbyTitle" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Name this Tracker</label>
                        <input type="text" name="modalHobbyTitle" id="modalHobbyTitle" autoComplete='off' className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} placeholder="Type a name" required />
                    </div>
                    <div>
                        <label htmlFor="modalHobbyColor" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Tracker Color</label>
                        <div className={`flex flex-row justify-between items-center bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} style={{ height: '38px', width: '183px' }}>
                            <div className={`text-xs md:text-sm`}>{colorName}</div>
                            <input type="color" name="modalHobbyColor" id="modalHobbyColor" autoComplete='off' className="flex h-full cursor-pointer" onChange={handleColorUpdate} />
                        </div>
                    </div>

                </div>
                <div>
                    <div className={`flex flex-row justify-between items-center`}>
                        <label htmlFor={catCreate ? 'modalHobbyCreate' : 'modalHobbyCategory'} className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Category</label>
                        <div className={`text-xs md:text-sm cursor-pointer text-blue-700 hover:text-blue-400`} onClick={handleCategoryCreate}>
                            {catCreate ? 'Select Existing Category' : 'Create New Category'}
                        </div>
                    </div>
                    {!catCreate &&
                        <select id="modalHobbyCategory" name="modalHobbyCategory" className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500`} defaultValue={categoryPassed ? categoryPassed : 'Select a category'}>
                            <option>Select a category</option>
                            {categoryPassed &&
                                <option value={categoryPassed}>{categoryPassed}</option>
                            }
                            {categories?.filter(item => item !== "").map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}

                        </select>
                    }
                    {catCreate &&
                        <input type='text' name="modalHobbyCreate" id="modalHobbyCreate" className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} placeholder="Type Category name" />
                    }
                </div>
                <div className="flex flex-row justify-between space-x-1">
                    <div>
                        <label htmlFor="modalHobbyGoalType" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Goal Type</label>
                        <select id="modalHobbyGoalType" name="modalHobbyGoalType" autoComplete="off" defaultValue={'Select Goal Type'} onChange={(e) => changeGoalChild(e.target.value)} className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}>
                            <option value="0">Select Goal Type</option>
                            <option value="1">Time</option>
                            <option value="2">Sessions Completed</option>
                            <option value="3">Distance</option>
                            <option value="4">Financial</option>
                            <option value="5">Write in your own goal</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='modalHobbyGoalValue' className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>{goalChild}</label>
                        <input type='text' name='modalHobbyGoalValue' id='modalHobbyGoalValue' autoComplete="off" className={`bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} placeholder={goalPlaceHolder} />
                    </div>
                </div>

                <div>
                    <label htmlFor="modalHobbyDescription" className={`block my-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white`}>Description</label>
                    <textarea id="modalHobbyDescription" name="modalHobbyDescription" autoComplete="off" rows={4} className={`block p-2.5 w-full text-xs md:text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="Write description here"></textarea>
                </div>
                <div className="flex flex-row justify-between space-x-1">
                    <button type="submit" className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                        Add new Tracker
                    </button>
                    <button type="button" className={`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xs md:text-sm ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white px-5`} data-modal-toggle="crud-modal" onClick={handleModalOpen}>
                        Log a session
                    </button>
                </div>
            </div>
        </form>
    )
}