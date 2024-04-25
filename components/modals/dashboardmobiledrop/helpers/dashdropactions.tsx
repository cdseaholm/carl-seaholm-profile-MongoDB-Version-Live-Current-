import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { useModalContext } from "@/app/context/modal/modalContext"; 

export default function DashDropActionsButton() {

    const { setOpenDashboardMobileDropdown, handleModalLogSesh, handleModalNewTrack } = useModalContext();

    const handleDesireToEdit = () => {
        console.log('Edit button clicked');
      }

      const handleAdd = () => {
        setOpenDashboardMobileDropdown(false);
        handleModalNewTrack();
      }

      const handleLog = () => {
        setOpenDashboardMobileDropdown(false);
        handleModalLogSesh();
      }

    return (
        <select id="actionsDropdown" name="actionsDropdown"
                          className={`block text-black font-medium rounded-lg w-2/5 md:w-1/4 text-xs text-left bg-transparent border-transparent hover:bg-gray-400 cursor-pointer`} 
                          defaultValue='+'
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            e.target.value = '+'; // Reset the select value to '+'
                            switch(selectedValue) {
                              case 'add':
                                handleAdd();
                                break;
                              case 'log':
                                handleLog();
                                break;
                              case 'edit':
                                handleDesireToEdit();
                                break;
                              default:
                                break;
                            }
                          }}
                        >
                          <option id="+" value="+">
                            Actions
                          </option>
                          <option id="add" value='add'>
                            + New Tracker
                          </option>
                          <option id="log" value='log'>
                            Log Session
                          </option>
                          <option id="edit" value='edit'>
                            Edit
                          </option>
                        </select>
    );
}