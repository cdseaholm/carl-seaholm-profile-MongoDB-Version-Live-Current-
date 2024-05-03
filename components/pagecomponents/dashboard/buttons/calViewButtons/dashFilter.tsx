import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";

export default function DashFilterButton({titles, categories}: { titles: string[], categories: string[]}) {

    const { setFilterItem } = useHobbyContext();
      
    return (
            <select id='filterDropdown' name="filterDropdown" className={`block text-black font-medium rounded-lg w-2/5 md:w-1/4 text-xs text-left bg-transparent border-transparent hover:bg-gray-400 cursor-pointer`}  
                      defaultValue='No Filter'  
                      onChange={(e) => {
                        const target = e.target as HTMLSelectElement;
                        setFilterItem(target.value);
                      }}
                    >
                      <option id="No Filter" value="No Filter">
                        No Filter
                      </option>
                      <optgroup label=" "/>
                      <optgroup label="Filter by Category:">
                        {categories && categories.length > 0 && categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label=" "/>
                      <optgroup label="Filter by Title:">
                        {titles && titles.length > 0 && titles.map((title, index) => (
                          <option key={index} value={title}>
                            {title}
                          </option>
                        ))}
                      </optgroup>
                    </select>
    );
}