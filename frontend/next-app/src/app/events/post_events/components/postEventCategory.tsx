"use client"

import {useState} from "react"

//define type of each option
type Option = {
    value: string,
    lable: string
};

interface MultiSelectProps{
    options: Option[], //list of option available
    placeholder?: string
}

export default function Category({options, placeholder}:MultiSelectProps){
    const [selected, setSelected] = useState<Option[]>([]); //for the selected options
    const [isOpen, setIsOpen] = useState(false); //for user to interact with dropdown

    const toggleOption = (option:Option) => {
        //if option is selected, when click again, it will be removed
        if(selected.find(o => o.value === option.value)){ //find o in selected, if find a value o equal to the option.value...
            setSelected(selected.filter(o => o.value !== option.value))
        }
        else{
            setSelected([...selected, option]); //if not, then put that option into selected
        }
    }

    return(
        <div className="p-2">
            {/*Display all the selected options*/}
            <div
            className=" rounded p-2 flex flex-wrap items-center gap-1 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}> {/*Click this to open or close the dropdown*/}
                
                {selected.map(option => (
                    <span className="bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-1"
                    key={option.value} 
                    onClick={e => {
                            e.stopPropagation();
                            toggleOption(option)
                        }}>
                        {option.lable} 
                    </span>
                ))}
                {/*If nothing was selected, show placeholder*/}
                {!selected.length && (
                    <span className="text-gray-400">{placeholder}</span>
                )}
            </div>
            
            {/*Display the dropbox*/}
            {isOpen && (
                <ul className="absolute z-10 w-48 max-h-48 overflow-y-auto border border-gray-300 rounded mt-1 bg-gray-300"> {/*dropdown list*/}
                    {options.map(opt => (
                        <li 
                        key={opt.value}
                        onClick={() => toggleOption(opt)} //select or remove option when clicked
                        className={`p-2 cursor-pointer hover:bg-blue-600 ${selected.find(o => o.value === opt.value) ? "bg-blue-400 text-white w-40" : ""}`}
                        >{opt.lable}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}