import { useHobbyContext } from "@/app/context/hobby/hobbyModalContext";
import { useStateContext } from "@/app/context/state/StateContext";
import { IHobby } from "@/models/types/hobby";
import { useState, useEffect } from "react";

export default function DashDropFilterButton() {
    const { setLoading } = useStateContext();
    const { hobbies, setFilterItem } = useHobbyContext();
    const [titles, setTitles] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        setLoading(true);
        if (hobbies.length === 0) {
          setLoading(false);
          return;
        }
        setTitles(hobbies.map((hobby: IHobby) => hobby.title));
        setCategories(hobbies.map((hobby: IHobby) => hobby.categories).flat())
        setLoading(false);
        console.log('categories', categories);
            
      }, [hobbies]);
      
    return (
        <div className="flex flex-col justify-center items-center">
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
        </div>
    );
}