export default async function ModalHobby() { 

    return (
        <dialog id="modal" className="modal">
            <div className="flex flex-col p-2">
                <div id="myModal" className="modalflex flex-row justify-center">
                    Create a Hobby to Track
                </div>
                <div>
                    <input type="text" placeholder="Hobby Name" />
                    <input type="text" placeholder="Category" />
                    <input type="text" placeholder="Description" />

                </div>
                <div>
                    <button onClick={() => {
                        //saveHobby();
                        //setOpen(false);
                    }}>
                        Save
                    </button>
                    <button onClick={() => {
                        //setOpen(false);
                    }}>
                        Close
                    </button>
                </div>
            </div>
        </dialog>
    )
}