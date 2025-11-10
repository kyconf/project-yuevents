"use client"

import {useState} from "react"

//define type of each option
type Option = {
    value: string,
    label: string
};

interface MultiSelectProps{
    options: Option[], //list of option available
    placeholder?: string
    onChange: (selected: Option[]) => void
}

export default function Category({options, placeholder, onChange}:MultiSelectProps){
    const [selected, setSelected] = useState<Option[]>([]); //for the selected options
    const [isOpen, setIsOpen] = useState(false); //for user to interact with dropdown

    const toggleOption = (option:Option) => {
        let newSelected;
        //if option is selected, when click again, it will be removed
        if(selected.find(o => o.value === option.value)){ //find o in selected, if find a value o equal to the option.value...
            newSelected = selected.filter(o => o.value !== option.value)
        }
        else{
            newSelected = [...selected, option]; //if not, then put that option into selected
            
        }
        setSelected(newSelected);
        onChange(newSelected);


    }

    return(<>
        <div className="flex gap-10 mt-5 ml-5">
                    <div className=" rounded cursor-pointer  text-blue-300">
                        <label>Category</label>

          <div className="p-2">
            {/*Display all the selected options*/}
            <div className=" bg-white rounded p-2 flex flex-wrap items-center gap-1 cursor-pointer">
               
                {selected.map(option => (
                    <span className="bg-blue-300 text-white px-2 py-1 rounded flex items-center gap-1"
                    key={option.value} 
                    onClick={e => {
                            e.stopPropagation();
                            toggleOption(option)
                        }}>
                        {option.label} 
                    </span>
                ))}
                {/*If nothing was selected, show placeholder*/}
                {!selected.length && (
                    <span className="text-gray-400">{placeholder}</span>
                )}
                 <div 
                className="p-3 ml-3 text-2xl border rounded h-8 flex items-center text-white bg-blue-500 transition hover:bg-blue-900"  
                onClick={() => setIsOpen(!isOpen)} >↓</div> {/*Click this to open or close the dropdown*/}
            </div>
            
            {/*Display the dropbox*/}
            {isOpen && (
                <ul className="absolute z-10 w-48 max-h-48 overflow-y-auto border border-gray-300 rounded mt-1 bg-gray-300"> {/*dropdown list*/}
                    {options.map(opt => (
                        <li 
                        key={opt.value}
                        onClick={() => toggleOption(opt)} //select or remove option when clicked
                        className={`p-2 cursor-pointer hover:bg-blue-600 ${selected.find(o => o.value === opt.value) ? "bg-blue-400 text-white w-40" : ""}`}
                        >{opt.label}</li>
                    ))}
                </ul>
            )}
        </div>
                    </div>
                </div>

       
        </>
    );
}