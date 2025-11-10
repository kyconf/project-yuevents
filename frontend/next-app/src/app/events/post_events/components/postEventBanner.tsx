interface Props{
    file: File | null
    onChange: (file:File) => void
}
export default function EventBanner({file, onChange}:Props){
    return(
         <div className="flex flex-col text-blue-300 mr-15">
           <label className="mb-1">Upload Poster</label>
           <input
                 type="file"
                 accept="image/*"
                 className="w-full border p-2 -pb-5 mb-4 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                 required
                 onChange={e => { if(e.target.files) onChange(e.target.files[0])}} //if statement make sure that the file cannot be null when passing
           />
         </div>
    );
}